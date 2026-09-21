import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { trainingCategories } from '@/data/content'
import { Image } from '@/components/ui/Image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { useSmoothScroll } from '@/lib/SmoothScroll'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const COUNT = trainingCategories.length

export function Training() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const el = textRef.current
    if (!el || reducedMotion) return
    gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
  }, [activeIndex, reducedMotion])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const idx = Math.min(COUNT - 1, Math.floor(self.progress * COUNT))
          setActiveIndex(idx)
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const goTo = (index: number) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const rect = wrapper.getBoundingClientRect()
    const wrapperTop = window.scrollY + rect.top
    const trackHeight = rect.height - window.innerHeight
    const target = wrapperTop + (trackHeight * (index + 0.35)) / COUNT
    scrollTo(target)
  }

  const active = trainingCategories[activeIndex]

  return (
    <section id="training" aria-label="Training" className="relative bg-vanta-charcoal">
      <div ref={wrapperRef} className="relative" style={{ height: `${COUNT * 100}vh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {trainingCategories.map((cat, i) => (
            <div
              key={cat.key}
              aria-hidden={i !== activeIndex}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
            >
              <Image
                src={cat.image.src(2200, 1500)}
                alt={`${cat.label} training at VANTA`}
                overlay="strong"
                wrapperClassName="h-full w-full"
                eager={i === 0}
              />
            </div>
          ))}

          <div className="container-vanta relative z-10 flex h-full flex-col justify-between py-28 md:py-32">
            <SectionLabel index="04" title="Training" />

            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <div key={active.key} ref={textRef}>
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-fog">
                    {active.index} / 0{COUNT}
                  </span>
                  <h2 className="mt-4 font-display text-display-2 font-extrabold uppercase leading-[0.95] text-vanta-white">
                    {active.label}
                  </h2>
                  <p className="mt-6 max-w-md text-balance font-sans text-vanta-fog md:text-lg">{active.copy}</p>
                  <ul className="mt-6 flex flex-col gap-2">
                    {active.detail.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-vanta-fog/80"
                      >
                        <span className="h-px w-6 bg-vanta-fog/50" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 md:flex-col md:gap-3">
                {trainingCategories.map((cat, i) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === activeIndex}
                    className="group flex items-center gap-3 py-2 text-left"
                  >
                    <span
                      className={clsx(
                        'h-px transition-all duration-500 ease-out',
                        i === activeIndex ? 'w-10 bg-vanta-white' : 'w-4 bg-vanta-fog/40 group-hover:bg-vanta-fog',
                      )}
                    />
                    <span
                      className={clsx(
                        'font-mono text-[11px] uppercase tracking-widest2 transition-colors duration-500',
                        i === activeIndex ? 'text-vanta-white' : 'text-vanta-fog/50 group-hover:text-vanta-fog',
                      )}
                    >
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
