import { useState } from 'react'
import clsx from 'clsx'
import { coaches } from '@/data/content'
import { Image } from '@/components/ui/Image'
import { RevealImage } from '@/components/ui/RevealImage'
import { RevealFade } from '@/components/ui/RevealFade'
import { RevealText } from '@/components/ui/RevealText'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useCursor } from '@/lib/Cursor'

export function Coaching() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { setVariant, clearVariant } = useCursor()
  const active = coaches[activeIndex]

  return (
    <section id="coaching" aria-label="Coaching" className="relative bg-vanta-bone py-28 text-vanta-black md:py-40">
      <div className="container-vanta">
        <RevealFade>
          <SectionLabel index="06" title="Coaching" light />
        </RevealFade>
        <h2 className="mt-6 max-w-4xl font-display text-display-2 font-bold uppercase leading-[0.95]">
          <RevealText lines={['Coached, Not', 'Just Supervised.']} />
        </h2>

        {/* Desktop: interactive roster */}
        <div className="mt-16 hidden gap-16 md:mt-20 md:grid md:grid-cols-12">
          <ul className="col-span-5 flex flex-col border-t border-vanta-black/15">
            {coaches.map((coach, i) => (
              <li key={coach.name} className="border-b border-vanta-black/15">
                <button
                  type="button"
                  onMouseEnter={() => {
                    setActiveIndex(i)
                    setVariant('view')
                  }}
                  onFocus={() => setActiveIndex(i)}
                  onMouseLeave={clearVariant}
                  className={clsx(
                    'group flex w-full items-baseline justify-between py-6 text-left transition-colors duration-300',
                    i === activeIndex ? 'text-vanta-black' : 'text-vanta-black/55 hover:text-vanta-black/80',
                  )}
                >
                  <span className="font-display text-2xl font-bold uppercase lg:text-3xl">{coach.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest2">{coach.specialty}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-vanta-graphite">
              {coaches.map((coach, i) => (
                <div
                  key={coach.name}
                  className="absolute inset-0 transition-opacity duration-500 ease-out"
                  style={{ opacity: i === activeIndex ? 1 : 0 }}
                  aria-hidden={i !== activeIndex}
                >
                  <Image
                    src={coach.image.src(1400, 1050)}
                    alt={`Portrait of coach ${coach.name}, ${coach.specialty}`}
                    wrapperClassName="h-full w-full"
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-lg text-balance font-sans text-vanta-black/70">{active.bio}</p>
          </div>
        </div>

        {/* Mobile / touch: stacked editorial cards */}
        <div className="mt-14 flex flex-col gap-14 md:hidden">
          {coaches.map((coach) => (
            <RevealFade key={coach.name}>
              <RevealImage
                src={coach.image.src(1000, 1150)}
                alt={`Portrait of coach ${coach.name}, ${coach.specialty}`}
                wrapperClassName="aspect-[4/5] w-full"
              />
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl font-bold uppercase">{coach.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-vanta-black/60">
                  {coach.specialty}
                </span>
              </div>
              <p className="mt-3 font-sans text-vanta-black/70">{coach.bio}</p>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
