
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, Heart } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Compétences', href: '/skills' },
  { label: 'Projets', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  {
    Icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/Zobinou',
  },
  {
    Icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zo-lantosoa-niritsiafoy-a0b153354',
  },
  {
    Icon: Mail,
    label: 'Email',
    href: 'mailto:lantosoanir@gmail.com',
  },
  {
    Icon: Phone,
    label: 'Téléphone',
    href: 'tel:+261385766107',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border bg-bg-primary">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
      />
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start gap-3"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-text-primary"
            >
              <Image
                src="/favicon.jpeg"
                alt="Zo Lantosoa Logo"
                width={40}
                height={40}
                priority
                className="h-10 w-10 shrink-0 rounded-lg border border-border object-cover shadow-sm"
              />
              <span>Zo Lantosoa</span>
            </Link>

            <p className="max-w-md text-xs leading-relaxed text-text-secondary sm:text-sm sm:leading-7">
              Passionnée par la Data et les nouvelles technologies, je transforme
              les données et les idées en solutions numériques innovantes,
              en combinant analyse de données, développement web, solutions ERP
              avec Odoo et marketing digital.
            </p>

            <div className="mt-1 flex items-center gap-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={
                    link.href.startsWith('https://')
                      ? '_blank'
                      : undefined
                  }
                  rel={
                    link.href.startsWith('https://')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  aria-label={link.label}
                  title={link.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-card text-text-secondary transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <link.Icon className="h-4 w-4" />
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
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-primary">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {navLinks.map((link) => (
                <li key={link.href} className="min-w-0">
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 whitespace-nowrap text-xs text-text-secondary transition-colors duration-200 hover:text-primary"
                  >
                    <span className="h-px w-0 shrink-0 bg-primary transition-all duration-300 group-hover:w-3" />
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-center text-[11px] text-text-secondary sm:flex-row sm:text-left lg:px-8">
          <p>
            © {currentYear} Zo Lantosoa. Tous droits réservés.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="inline-flex"
            >
              <Heart className="h-3 w-3 fill-primary text-primary" />
            </motion.span>
            <span>· Next.js · Tailwind CSS v4 · Babylon.js</span>
          </p>
        </div>
      </div>
    </footer>
  )
}