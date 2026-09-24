import { images } from '@/data/images'
import { performancePillars } from '@/data/content'
import { RevealImage } from '@/components/ui/RevealImage'
import { RevealText } from '@/components/ui/RevealText'
import { RevealFade } from '@/components/ui/RevealFade'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function Performance() {
  return (
    <section id="performance" aria-label="Performance" className="relative bg-vanta-black py-28 md:py-40">
      <div className="container-vanta">
        <RevealFade>
          <SectionLabel index="05" title="Performance" />
        </RevealFade>
        <h2 className="mt-6 max-w-4xl font-display text-display-2 font-extrabold uppercase leading-[0.95] text-vanta-white">
          <RevealText lines={['Built To', 'Perform.']} />
        </h2>
      </div>

      <div className="relative mt-16 md:mt-20">
        <RevealImage
          src={images.performance.src(2400, 1400)}
          alt="Athlete captured mid-motion during a performance training session"
          wrapperClassName="h-[60vh] w-full md:h-[75vh]"
          overlay="strong"
          parallax
          parallaxAmount={90}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-vanta-black/85 via-vanta-black/40 to-transparent"
        />

        <div className="container-vanta absolute inset-0 flex items-end pb-10 md:pb-16">
          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {performancePillars.map((pillar, i) => (
              <RevealFade key={pillar.label} delay={i * 0.08}>
                <span
                  aria-hidden="true"
                  className="text-outline block truncate font-display text-xl font-extrabold uppercase leading-none sm:text-2xl"
                >
                  {pillar.label}
                </span>
                <h3 className="sr-only">{pillar.label}</h3>
                <p className="mt-4 max-w-[26ch] text-balance font-sans text-sm text-vanta-fog md:text-base">
                  {pillar.copy}
                </p>
              </RevealFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
