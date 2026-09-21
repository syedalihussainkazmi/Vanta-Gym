import { recoveryOfferings } from '@/data/content'
import { RevealImage } from '@/components/ui/RevealImage'
import { RevealFade } from '@/components/ui/RevealFade'
import { RevealText } from '@/components/ui/RevealText'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function Recovery() {
  return (
    <section id="recovery" aria-label="Recovery" className="relative bg-vanta-black py-28 md:py-40">
      <div className="container-vanta">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <RevealFade>
            <SectionLabel index="07" title="Recovery" />
            <h2 className="mt-6 max-w-4xl font-display text-display-2 font-bold uppercase leading-[0.95] text-vanta-white">
              <RevealText lines={['Recovery Is', 'Programming.']} />
            </h2>
          </RevealFade>
          <RevealFade delay={0.1} className="max-w-sm">
            <p className="text-balance font-sans text-vanta-fog">
              The work doesn't stop when the set ends. VANTA treats recovery as part of the
              program — not an amenity bolted on afterward.
            </p>
          </RevealFade>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {recoveryOfferings.map((offering, i) => (
            <RevealFade key={offering.label} delay={i * 0.08}>
              <RevealImage
                src={offering.image.src(900, 1100)}
                alt={offering.label}
                wrapperClassName="aspect-[4/5] w-full"
                hoverScale={0.06}
                cursorLabel={offering.label}
              />
              <h3 className="mt-5 font-display text-xl font-bold uppercase text-vanta-white">
                {offering.label}
              </h3>
              <p className="mt-2 text-balance font-sans text-sm text-vanta-fog">{offering.copy}</p>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
