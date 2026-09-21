import { contactDetails } from '@/data/content'
import { RevealFade } from '@/components/ui/RevealFade'
import { RevealText } from '@/components/ui/RevealText'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { ContactForm } from './ContactForm'

export function Location() {
  const mapsQuery = encodeURIComponent(contactDetails.address.join(', '))

  return (
    <section id="contact" aria-label="Location and Contact" className="relative bg-vanta-black py-28 md:py-40">
      <div className="container-vanta">
        <RevealFade>
          <SectionLabel index="10" title="Location" />
        </RevealFade>
        <h2 className="mt-6 max-w-2xl font-display text-display-2 font-bold uppercase leading-[0.95] text-vanta-white">
          <RevealText lines={['Come See The', 'Floor.']} />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-12 md:gap-10">
          <RevealFade className="md:col-span-5">
            <address className="not-italic">
              <p className="font-display text-xl font-bold uppercase text-vanta-white">VANTA</p>
              <p className="font-display text-xl font-bold uppercase text-vanta-white">Performance Club</p>
              <p className="mt-4 font-sans text-vanta-fog">
                {contactDetails.address[0]}
                <br />
                {contactDetails.address[1]}
              </p>
            </address>

            <div className="mt-10 flex flex-col gap-2 font-sans text-vanta-fog">
              <a
                href={`mailto:${contactDetails.email}`}
                className="w-fit transition-colors duration-300 ease-out hover:text-vanta-white"
              >
                {contactDetails.email}
              </a>
              <a
                href={`tel:${contactDetails.phone.replace(/[^+\d]/g, '')}`}
                className="w-fit transition-colors duration-300 ease-out hover:text-vanta-white"
              >
                {contactDetails.phone}
              </a>
            </div>

            <dl className="mt-10 flex flex-col gap-2 font-mono text-xs uppercase tracking-wide text-vanta-mist">
              {contactDetails.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6 border-b border-vanta-steel/20 py-2">
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex gap-6 font-mono text-[11px] uppercase tracking-widest2 text-vanta-fog">
              {contactDetails.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 ease-out hover:text-vanta-white"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              className="mt-10"
            >
              Get Directions
            </Button>
          </RevealFade>

          <RevealFade delay={0.1} className="md:col-span-7">
            <ContactForm />
          </RevealFade>
        </div>
      </div>
    </section>
  )
}
