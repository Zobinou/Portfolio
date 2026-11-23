'use client'

import { Mail, Phone, Quote } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { testimonialsData } from '@/data/testimonials'
import FadeIn from '@/components/animations/FadeIn'

const contactLinks = [
  {
    Icon: Mail,
    label: 'lantosoanir@gmail.com',
    href: 'mailto:lantosoanir@gmail.com',
  },
  {
    Icon: Phone,
    label: '+261 38 576 61 07',
    href: 'tel:+261385766107',
  },
  {
    Icon: FaLinkedin,
    label: 'linkedin.com/in/zo-lantosoa-niritsiafoy',
    href: 'https://www.linkedin.com/in/zo-lantosoa-niritsiafoy-a0b153354',
  },
  {
    Icon: FaGithub,
    label: 'github.com/Zobinou',
    href: 'https://github.com/Zobinou',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-2 md:gap-16 lg:px-8">
        <FadeIn direction="right">
          <div className="text-center md:text-left">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
              Contact
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              Un projet en tête ?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base md:mx-0">
              N&apos;hésitez pas à me contacter pour discuter de vos idées, d&apos;une
              opportunité d&apos;alternance ou d&apos;une collaboration. Je serais ravie
              d&apos;échanger avec vous !
            </p>

            <Button
              size="lg"
              className="mt-8"
              onClick={() => {
                window.location.href = 'mailto:lantosoanir@gmail.com'
              }}
            >
              Me contacter
            </Button>

            <h3 className="mt-12 text-lg font-semibold text-text-primary">Follow Me</h3>
            <ul className="mt-5 space-y-4">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card text-primary transition-colors group-hover:border-primary/50">
                      <link.Icon className="h-4 w-4" />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {testimonialsData.map((testimonial, i) => (
            <FadeIn key={i} delay={i * 0.1} direction="left">
              <Card className="relative">
                <span className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent-blue text-white shadow-lg shadow-primary/30">
                  <Quote className="h-5 w-5" />
                </span>
                <CardContent className="pt-10">
                  <blockquote className="text-sm italic leading-relaxed text-text-secondary sm:text-base">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-4">
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      unoptimized
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/40"
                    />
                    <div>
                      <p className="font-semibold text-text-primary">{testimonial.name}</p>
                      <p className="text-xs text-text-secondary">{testimonial.poste}</p>
                    </div>
                  </figcaption>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}