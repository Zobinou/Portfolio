'use client'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary py-8">
      <div className="mx-auto max-w-7xl space-y-1 px-6 text-center lg:px-8">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()} Niritsiafoy Lantosoa. Tous droits réservés.
        </p>
        <p className="text-sm text-text-muted">
          Made with <span className="text-primary">♥</span> · Next.js · Tailwind CSS v4
        </p>
      </div>
    </footer>
  )
}