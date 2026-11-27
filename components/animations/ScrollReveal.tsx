'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function ScrollReveal({
  children,
  selector = '.reveal',
}: {
  children: ReactNode
  selector?: string
}) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const elements = gsap.utils.toArray<HTMLElement>(selector)
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    },
    { scope: container }
  )

  return <div ref={container}>{children}</div>
}