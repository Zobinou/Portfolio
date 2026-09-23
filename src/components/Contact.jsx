import { FaEnvelope, FaPhoneAlt, FaLinkedinIn, FaGithub, FaQuoteLeft } from 'react-icons/fa'
import { testimonialsData } from '../data/testimonialsData'

// Mettez à jour votre lien GitHub si nécessaire
const contactLinks = [
  { Icon: FaEnvelope, label: 'lantosoanir@gmail.com', href: 'mailto:lantosoanir@gmail.com' },
  { Icon: FaPhoneAlt, label: '+261 38 576 61 07', href: 'tel:+261385766107' },
  {
    Icon: FaLinkedinIn,
    label: 'linkedin.com/in/zo-lantosoa-niritsiafoy-a0b153354',
    href: 'https://www.linkedin.com/in/zo-lantosoa-niritsiafoy-a0b153354',
  },
  { Icon: FaGithub, label: 'github.com/NiriDev', href: 'https://github.com' },
]

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-2 md:gap-16 lg:px-8">
        {/* ===== Colonne gauche ===== */}
        <div className="text-center md:text-left">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-purple sm:text-xs">
            Contact
          </span>
          <h2 className="font-display mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
            N&apos;hésitez pas à me contacter pour discuter de vos idées, d&apos;une opportunité
            d&apos;alternance ou d&apos;une collaboration. Je serais ravie d&apos;échanger avec
            vous !
          </p>

          <a
            href="mailto:lantosoanhr@gmail.com"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-purple/40 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-purple/50"
          >
            Get In Touch
          </a>

          {/* Follow Me */}
          <h3 className="mt-12 text-lg font-semibold text-white">Follow Me</h3>
          <ul className="mt-5 space-y-4">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-accent-purple"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-bg-card text-accent-purple transition-colors group-hover:border-accent-purple/50">
                    <link.Icon />
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== Colonne droite : témoignages ===== */}
        <div className="space-y-8">
          {testimonialsData.map((testimonial, i) => (
            <figure
              key={i}
              className="relative rounded-2xl border border-white/5 bg-bg-card p-8 shadow-xl"
            >
              <span className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-blue text-white shadow-lg shadow-accent-purple/30">
                <FaQuoteLeft className="h-5 w-5" />
              </span>

              <blockquote className="mt-4 text-sm italic leading-relaxed text-gray-300 sm:text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-accent-purple/40"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.poste}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
