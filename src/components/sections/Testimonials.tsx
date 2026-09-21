import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { testimonials } from '@/data/content'
import { Image } from '@/components/ui/Image'
import { RevealFade } from '@/components/ui/RevealFade'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { useCursor } from '@/lib/Cursor'
import { gsap } from '@/lib/gsap'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const directionRef = useRef(1)
  const quoteRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { setVariant, clearVariant } = useCursor()
  const count = testimonials.length
  const active = testimonials[index]

  const go = (next: number) => {
    directionRef.current = next > index || (index === count - 1 && next === 0) ? 1 : -1
    setIndex((next + count) % count)
  }

  useEffect(() => {
    const el = quoteRef.current
    if (!el || reducedMotion) return
    gsap.fromTo(
      el,
      { opacity: 0, x: directionRef.current * 20 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' },
    )
  }, [index, reducedMotion])

  return (
    <section id="stories" aria-label="Member Stories" className="relative bg-vanta-bone py-28 text-vanta-black md:py-40">
      <div className="container-vanta">
        <RevealFade className="flex justify-center">
          <SectionLabel index="09" title="Member Stories" light />
        </RevealFade>

        <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center text-center md:mt-20">
          <div
            onMouseEnter={() => setVariant('view')}
            onMouseLeave={clearVariant}
            className="h-20 w-20 overflow-hidden rounded-full bg-vanta-graphite md:h-24 md:w-24"
          >
            <Image
              src={active.image.src(300, 300)}
              alt={`Portrait of VANTA member ${active.name}`}
              wrapperClassName="h-full w-full rounded-full"
            />
          </div>

          <div className="mt-10 min-h-[10rem] md:min-h-[8rem]">
            <div key={active.name} ref={quoteRef}>
              <p className="text-balance font-display text-2xl font-medium leading-snug md:text-3xl">
                &ldquo;{active.quote}&rdquo;
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-vanta-black/60">
                {active.name} — {active.detail}
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous member story"
              className="font-mono text-xs uppercase tracking-widest2 text-vanta-black/65 transition-colors hover:text-vanta-black"
            >
              ← Prev
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to story ${i + 1}`}
                  aria-current={i === index}
                  className={clsx(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === index ? 'w-6 bg-vanta-black' : 'w-1.5 bg-vanta-black/25',
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next member story"
              className="font-mono text-xs uppercase tracking-widest2 text-vanta-black/65 transition-colors hover:text-vanta-black"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
