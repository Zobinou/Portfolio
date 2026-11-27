"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  Quote,
  User,
  ArrowUpRight,
  Sparkles,
  MessageCircle
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import FadeIn from "@/components/animations/FadeIn";
import { testimonialsData as staticTestimonials } from "@/data/testimonials";
import ContactForm from "./ContactForm";

export interface TestimonialItem {
  quote: string;
  name: string;
  poste: string;
  photo?: string | null;
}

const contactLinks = [
  {
    Icon: Mail,
    label: "lantosoanir@gmail.com",
    description: "Email",
    href: "mailto:lantosoanir@gmail.com",
  },
  {
    Icon: Phone,
    label: "+261 38 576 61 07",
    description: "Téléphone",
    href: "tel:+261385766107",
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    description: "Retrouvez mon profil professionnel",
    href: "https://www.linkedin.com/in/zo-lantosoa-niritsiafoy-a0b153354",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    description: "Découvrez mes réalisations",
    href: "https://github.com/Zobinou",
  },
];

export default function Contact({
  testimonials,
}: {
  testimonials?: TestimonialItem[];
}) {
  const data = testimonials?.length ? testimonials : staticTestimonials;

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-20 overflow-hidden py-20 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <FadeIn direction="up">
          <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
              <MessageCircle className="h-4 w-4 text-primary" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                Get In Touch
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Construisons quelque chose de{" "}
              <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                remarquable
              </span>
              .
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-text-secondary sm:text-base sm:leading-9">
              Une idée, un projet, une opportunité d&apos;alternance ou
              simplement une envie d&apos;échanger ? Je serais ravie
              de discuter avec vous.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">

          <FadeIn direction="right">
            <div className="flex h-full flex-col">

              <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">

                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent-blue text-white shadow-lg shadow-primary/20">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <h2 className="font-display mt-6 text-2xl font-extrabold leading-tight text-text-primary sm:text-3xl">
                    Un projet en tête ?
                  </h2>

                  <p className="mt-4 text-sm leading-8 text-text-secondary sm:text-base">
                    Je suis ouverte aux échanges autour du développement
                    web, des nouvelles technologies, des projets numériques,
                    des opportunités professionnelles et des collaborations.
                  </p>

                  <div className="mt-7 flex items-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MessageCircle className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-text-primary">
                        Entrons en contact
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                        Je suis disponible pour échanger sur vos idées.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-5">
                  <h3 className="font-display text-xl font-bold text-text-primary">
                    Mes coordonnées
                  </h3>

                  <p className="mt-2 text-sm text-text-secondary">
                    Retrouvez-moi à travers ces différents canaux.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {contactLinks.map((link) => {
                    const Icon = link.Icon;

                    const isExternal = link.href.startsWith("http");

                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="group flex min-w-0 items-center gap-3 rounded-2xl border border-border/70 bg-bg-card/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-bg-card hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                            {link.description}
                          </p>

                          <p className="mt-1 truncate text-xs font-bold text-text-primary transition-colors group-hover:text-primary sm:text-sm">
                            {link.label}
                          </p>
                        </div>

                        <ArrowUpRight className="h-4 w-4 shrink-0 text-text-secondary/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-bg-card/90 p-5 shadow-xl shadow-black/5 backdrop-blur-xl sm:p-8 lg:p-9">

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-[90px]"
              />

              <div className="relative">
                <div className="mb-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>

                  <h2 className="font-display text-2xl font-extrabold text-text-primary sm:text-3xl">
                    Envoyez-moi un message
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-text-secondary">
                    Remplissez le formulaire ci-dessous pour me présenter
                    votre demande. Je serai ravie de prendre connaissance
                    de votre message.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>

        {data.length > 0 && (
          <section className="mt-24 md:mt-32">
            <FadeIn direction="up">
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                  <Quote className="h-4 w-4 text-primary" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs">
                    Testimonials
                  </span>
                </div>

                <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
                  Ils en parlent{" "}
                  <span className="bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                    mieux que moi
                  </span>
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-text-secondary sm:text-base">
                  Quelques témoignages et retours de personnes
                  avec lesquelles j&apos;ai eu l&apos;occasion de collaborer.
                </p>
              </div>
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.map((testimonial, index) => (
                <FadeIn
                  key={`${testimonial.name}-${index}`}
                  delay={index * 0.08}
                  direction="up"
                >
                  <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7">

                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent-blue text-white shadow-lg shadow-primary/20">
                        <Quote className="h-5 w-5 fill-current" />
                      </div>

                      <span className="text-3xl font-extrabold text-primary/15">
                        &ldquo;
                      </span>
                    </div>

                    <blockquote className="mt-6 flex-1 text-sm leading-8 text-text-secondary">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    <figcaption className="mt-7 flex items-center gap-3 border-t border-border/60 pt-5">
                      {testimonial.photo ? (
                        <Image
                          src={testimonial.photo}
                          alt={`Portrait de ${testimonial.name}`}
                          width={48}
                          height={48}
                          unoptimized
                          className="h-12 w-12 shrink-0 rounded-full border-2 border-primary/30 object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary">
                          <User className="h-5 w-5" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-text-primary">
                          {testimonial.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-text-secondary">
                          {testimonial.poste}
                        </p>
                      </div>
                    </figcaption>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-accent-blue transition-all duration-500 group-hover:w-full" />
                  </figure>
                </FadeIn>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}