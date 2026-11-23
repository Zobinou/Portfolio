import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 text-center">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
        404
      </span>
      <h1 className="font-display mt-3 text-3xl font-bold text-text-primary sm:text-5xl">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-sm text-text-secondary sm:text-base">
        Désolé, cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  )
}