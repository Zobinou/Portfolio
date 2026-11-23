'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Education', href: '/education' },
  { label: 'Compétences', href: '/skills' },
  { label: 'Qualités', href: '/qualities' },
  { label: 'Expérience', href: '/experience' },
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

const menuVariants: Variants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut', staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function Header() {
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, getServerSnapshot)
  const mounted = useSyncExternalStore(subscribeToNothing, getMountedSnapshot, getServerSnapshot)
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const pathname = usePathname()
  const isHome = pathname === '/'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const hasBackground = scrolled || !isHome

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasBackground
          ? 'border-b border-border bg-bg-primary/80 shadow-lg shadow-black/5 backdrop-blur-md dark:shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-text-primary"
          >
            <span className="text-primary">&lt;/&gt;</span>
            <span>NiriDev</span>
          </Link>
        </motion.div>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative text-sm font-medium transition-colors ${
                    active ? 'text-primary' : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full overflow-hidden rounded-full">
                    {!active && (
                      <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                    )}
                    {active && (
                      <motion.span
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 w-full bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          {mounted && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-shadow hover:shadow-primary/50"
            >
              Me contacter ↗
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden border-t border-border bg-bg-primary/95 backdrop-blur-md md:hidden"
          >
            <motion.ul className="space-y-1 px-6 py-4">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <motion.li key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-mobile-dot"
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </motion.li>
                )
              })}
              <motion.li variants={itemVariants} className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
                >
                  Me contacter ↗
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}