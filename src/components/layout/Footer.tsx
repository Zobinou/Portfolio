'use client'

import Link from 'next/link'
import { Mail, Phone, Heart } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

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

const socialLinks = [
  { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/Zobinou' },
  {
    Icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zo-lantosoa-niritsiafoy-a0b153354',
  },
  { Icon: Mail, label: 'Email', href: 'mailto:lantosoanir@gmail.com' },
  { Icon: Phone, label: 'Téléphone', href: 'tel:+261385766107' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border bg-bg-primary">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3 md:max-w-65"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-lg font-bold tracking-tight text-text-primary"
            >
              <span className="text-primary">&lt;/&gt;</span>
              <span>NiriDev</span>
            </Link>
            <p className="text-xs leading-relaxed text-text-secondary">
              Développeur web passionné, créateur d&apos;expériences modernes.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-card text-text-secondary transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <link.Icon className="h-3.5 w-3.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            aria-label="Navigation du pied de page"
            className="w-full md:w-auto"
          >
            <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-text-primary">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-primary"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-center text-[11px] text-text-secondary sm:flex-row sm:text-left lg:px-8">
          <p>
            © {currentYear} Niritsiafoy Lantosoa. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1.5">
            Made with
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <Heart className="h-3 w-3 fill-primary text-primary" />
            </motion.span>
            · Next.js · Tailwind CSS v4 · Designed by RJ
          </p>
        </div>
      </div>
    </footer>
  )
}