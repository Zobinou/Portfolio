"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Sparkles,
  Code2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const FULL_HEADING = "Bonjour, je me nomme Zo Lantosoa";
const GREETING = "Bonjour, je me nomme ";

export default function Hero() {
  const router = useRouter();

  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (typedText.length >= FULL_HEADING.length) return;

    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setTypedText(FULL_HEADING.slice(0, typedText.length + 1));
    }, 55);

    return () => clearTimeout(timeout);
  }, [typedText]);

  /*
  Si on a besoin de ceci
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (typedText.length >= FULL_HEADING.length) {
      timeout = setTimeout(() => {
        setTypedText("");
      }, 3000);
    } else {
      timeout = setTimeout(() => {
        setTypedText(FULL_HEADING.slice(0, typedText.length + 1));
      }, 55);
    }
  */

  const greetingText = typedText.slice(0, GREETING.length);
  const nameText = typedText.slice(GREETING.length);

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pb-24 pt-36 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]"
      />

      <div className="mx-auto grid max-w-352 grid-cols-1 items-center gap-16 px-5 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-16 xl:gap-24 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 min-w-0 text-center md:text-left"
        >
          <span className="mx-auto inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2.5 text-[10px] font-bold uppercase leading-relaxed tracking-[0.13em] text-primary shadow-sm shadow-primary/5 sm:text-xs md:mx-0 md:justify-start">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>Data, technologie et innovation numérique</span>
          </span>

          <div className="mt-8 min-h-31.25 sm:min-h-36.25 lg:mt-9 lg:min-h-41.25">
            <h1
              aria-label={FULL_HEADING}
              className="font-display text-[clamp(2.2rem,4.5vw,4.25rem)] font-extrabold leading-[1.12] tracking-tight text-text-primary"
            >
              <span className="sr-only">{FULL_HEADING}</span>

              <span aria-hidden="true">
                <span className="block">{greetingText}</span>

                <span className="inline bg-linear-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                  {nameText}
                </span>

                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="ml-1 inline-block text-primary"
                >
                  |
                </motion.span>
              </span>
            </h1>
          </div>

          <h2 className="font-display mx-auto mt-5 max-w-2xl text-xl font-semibold leading-snug text-text-secondary sm:text-2xl lg:text-[1.7rem] md:mx-0">
            Je transforme les données et les idées en solutions numériques.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary/90 sm:text-[1.05rem] sm:leading-9 md:mx-0">
            Animée par un fort intérêt pour la Data et les nouvelles technologies,
            je développe une approche polyvalente qui associe analyse de données,
            développement web, solutions ERP avec Odoo et marketing digital.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Button
              size="lg"
              onClick={() => router.push("/projects")}
              className="h-13 w-full justify-center gap-2 rounded-xl px-7 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/30 sm:w-auto"
            >
              Voir mes projets
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <motion.a
              href="/api/google/drive/cv/pdf"
              download="CV-Zo-Lantosoa.pdf"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-border bg-bg-card px-7 text-base font-semibold text-text-primary shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary hover:shadow-md sm:w-auto"
            >
              <Download className="h-5 w-5 text-primary" />
              Télécharger mon CV
            </motion.a>
          </div>

          <div className="mt-10 hidden items-center gap-3 md:flex">
            <span className="h-px w-12 bg-linear-to-r from-primary to-transparent" />
            <span className="text-xs font-medium tracking-[0.15em] text-text-secondary/60">
              CRÉATIVITÉ · TECHNOLOGIE · INNOVATION
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 25 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-87.5 w-87.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-primary to-accent-blue opacity-30 blur-[100px] sm:h-112.5 sm:w-112.5 lg:h-137.5 lg:w-137.5"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0 translate-x-4 translate-y-4 rounded-[2.5rem] border border-primary/40 bg-primary/5 sm:translate-x-5 sm:translate-y-5"
            />
            <div
              className="relative z-10 h-92.5 w-71.25 animate-float rounded-[2.3rem] p-0.75 sm:h-110 sm:w-85 md:h-115 md:w-87.5 lg:h-132.5 lg:w-102.5"
              style={{
                background:
                  "linear-gradient(145deg, var(--color-primary), var(--color-accent-blue), var(--color-primary))",
                boxShadow:
                  "0 25px 80px rgba(20, 184, 166, 0.18), 0 0 45px rgba(14, 165, 233, 0.12)",
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-bg-secondary">
                <Image
                  src="/api/google/drive/profile"
                  alt="Photo de profil de Niritsiafoy Lantosoa"
                  fill
                  sizes="(max-width: 640px) 285px, (max-width: 768px) 340px, (max-width: 1024px) 350px, 410px"
                  priority
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.9,
                duration: 0.7,
                ease: "easeOut",
              }}
              className="absolute -right-3 top-9 z-20 sm:-right-7 sm:top-12"
            >
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/20 bg-bg-card/90 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                    Digital
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    Innovation
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 15 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -7, 0],
              }}
              transition={{
                opacity: {
                  delay: 1.1,
                  duration: 0.7,
                },
                x: {
                  delay: 1.1,
                  duration: 0.7,
                },
                y: {
                  delay: 1.8,
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute -bottom-6 -left-3 z-20 sm:-bottom-7 sm:-left-8"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-bg-card/95 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl sm:px-5 sm:py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent-blue text-white shadow-lg shadow-primary/20">
                  <Code2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-extrabold text-text-primary">
                    Data · Web · ERP
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Solutions numériques
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}