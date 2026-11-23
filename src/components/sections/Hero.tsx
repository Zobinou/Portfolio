'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import BabylonScene from '@/components/3d/BabylonScene'

const driveImage = (id: string, size = 600) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`
const driveDownload = (id: string) =>
  `https://drive.google.com/uc?export=download&id=${id}`

const PHOTO_ID = '1CT12YIeF0xcc8cwhBpvR-Oq0AFOABwsw'
const CV_ID = '1yREH3L3uqeR37vCpSD474qqsG3Os0GDD'

const profilePhotoDrive = driveImage(PHOTO_ID, 600)
const profilePhotoLocal = '/assets/images/profile/photo.jpg'
const cvFile = driveDownload(CV_ID)

type PhotoSource = 'drive' | 'local' | 'fallback'

export default function Hero() {
  const router = useRouter()
  const [photoSource, setPhotoSource] = useState<PhotoSource>('drive')

  const photoSrc =
    photoSource === 'drive'
      ? profilePhotoDrive
      : photoSource === 'local'
        ? profilePhotoLocal
        : null

  const handleImageError = () => {
    setPhotoSource((prev) => {
      if (prev === 'drive') return 'local'
      if (prev === 'local') return 'fallback'
      return 'fallback'
    })
  }

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-bg-primary pb-24 pt-32 md:pb-32 md:pt-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.25),transparent_60%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
            Frontend Developer
          </span>

          <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.1] text-text-primary sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{' '}
            <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
              Niritsiafoy
            </span>
          </h1>

          <h2 className="font-display mt-3 text-xl font-semibold text-text-secondary sm:text-2xl lg:text-3xl">
            I build things for the web.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base md:mx-0">
            Étudiante en L2 informatique, spécialisée en développement frontend,
            passionnée par la création d&apos;interfaces modernes et performantes avec
            React.js, à la recherche d&apos;une alternance.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
            <Button size="lg" onClick={() => router.push('/projects')}>
              Voir mes projets <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(cvFile, '_blank', 'noopener,noreferrer')}
            >
              <Download className="h-4 w-4" /> Télécharger CV
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div className="relative flex justify-center">
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -z-10 h-70 w-70 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary to-accent-blue opacity-50 blur-[80px] md:h-100 md:w-100"
            />
            <div
              className="relative h-55 w-55 animate-float rounded-full p-0.75 md:h-70 md:w-70"
              style={{
                background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)',
                boxShadow:
                  '0 0 40px rgba(20, 184, 166, 0.4), 0 0 100px rgba(14, 165, 233, 0.2)',
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full bg-bg-secondary">
                {photoSrc ? (
                  <Image
                    key={photoSource}
                    src={photoSrc}
                    alt="Niritsiafoy Lantosoa"
                    fill
                    sizes="(max-width: 768px) 220px, 280px"
                    priority
                    unoptimized={photoSource === 'drive'}
                    className="object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User className="h-24 w-24 text-text-muted" aria-hidden />
                  </div>
                )}
              </div>
            </div>
          </div>

          <BabylonScene />
        </motion.div>
      </div>
    </section>
  )
}