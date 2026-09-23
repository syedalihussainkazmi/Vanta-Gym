import { useEffect, useRef } from 'react'
import { images } from '@/data/images'
import { trainingCategories } from '@/data/content'
import { Image } from '@/components/ui/Image'
import { RevealText } from '@/components/ui/RevealText'
import { RevealFade } from '@/components/ui/RevealFade'
import { Button } from '@/components/ui/Button'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { BarbellIcon, BoltIcon, KettlebellIcon, PulseIcon } from '@/components/ui/GymIcons'
import { useSmoothScroll } from '@/lib/SmoothScroll'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

const disciplineIcons = {
  strength: BarbellIcon,
  conditioning: PulseIcon,
  performance: BoltIcon,
  recovery: KettlebellIcon,
} as const

interface HeroProps {
  /** True once the preloader has begun dissolving — gates every entrance
   * animation so they play as the hero appears, not silently on mount
   * while the preloader still covers the screen. */
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const { scrollTo } = useSmoothScroll()
  const bgRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Initial hidden state — set immediately so nothing flashes unstyled
  // while it's still waiting behind the preloader.
  useEffect(() => {
    if (reducedMotion) return
    gsap.set(bgRef.current, { scale: 1.18 })
    gsap.set(vignetteRef.current, { opacity: 1 })
  }, [reducedMotion])

  // The actual reveal — only once the preloader signals it's dissolving.
  useEffect(() => {
    if (reducedMotion || !ready) return
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, { scale: 1, duration: 2.4, ease: 'power2.out' })
      gsap.to(vignetteRef.current, { opacity: 0, duration: 1.5, ease: 'power2.out', delay: 0.1 })
      gsap.fromTo(decorRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.2 })
    })
    return () => ctx.revert()
  }, [reducedMotion, ready])

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-vanta-black"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={images.hero.src(2400, 1600)}
          alt="Athlete training under low, dramatic light on the VANTA performance floor"
          eager
          overlay="strong"
          wrapperClassName="h-full w-full"
        />
      </div>
      <div
        ref={vignetteRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-vanta-black"
      />

      <div ref={decorRef} className="absolute inset-0 z-[11] opacity-0">
        <AnimatedBackground className="mix-blend-screen opacity-70" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[6%] top-32 z-[12] hidden md:top-36 md:block"
        >
          <div className="vanta-float-a relative -rotate-12 text-vanta-ember/25">
            <BarbellIcon className="w-40 lg:w-56" />
            <span className="vanta-travel-dot absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-vanta-ember shadow-[0_0_8px_2px_rgba(207,157,79,0.6)]" />
          </div>
        </div>

        <KettlebellIcon
          aria-hidden="true"
          className="vanta-float-c pointer-events-none absolute left-[7%] top-28 z-[12] hidden w-10 text-vanta-fog/20 md:top-32 md:block"
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 200 60"
          className="pointer-events-none absolute bottom-[30%] left-[3%] z-[12] hidden w-40 text-vanta-fog/20 lg:block"
        >
          <path
            d="M0 30 L40 30 L52 8 L66 52 L80 18 L92 40 L104 30 L200 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="vanta-draw-line"
          />
        </svg>
      </div>

      <div className="container-vanta relative z-20 flex flex-1 flex-col justify-between pb-8 pt-32 md:pb-10 md:pt-40">
        {ready && (
          <>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-fog">
              <RevealText lines={['Vanta — Performance Club']} delay={0.1} />
            </p>

            <div>
              <h1 className="font-display text-display-1 font-extrabold uppercase text-vanta-white">
                <RevealText lines={['Forged', 'In Motion.']} delay={0.3} stagger={0.12} />
              </h1>

              <RevealFade delay={0.85} start="top 100%" className="mt-8 md:mt-10">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                  <p className="max-w-md text-balance font-sans text-base text-vanta-fog md:text-lg">
                    A performance club built for strength, conditioning, and recovery. No shortcuts.
                    Train with intent.
                  </p>
                  <Button onClick={() => scrollTo('#philosophy')} variant="solid" className="shrink-0">
                    Enter Vanta
                  </Button>
                </div>
              </RevealFade>
            </div>

            <RevealFade delay={1.2} start="top 100%">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-vanta-fog/15 pt-5">
                <div className="flex items-center gap-2.5 text-vanta-fog" aria-hidden="true">
                  <svg viewBox="0 0 22 36" width="16" height="26" className="shrink-0">
                    <rect x="1" y="1" width="20" height="34" rx="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <circle className="vanta-scroll-dot" cx="11" cy="10" r="2.6" fill="currentColor" />
                  </svg>
                  <span className="font-mono text-[10px] uppercase tracking-widest2">Scroll</span>
                </div>

                <span className="hidden h-4 w-px bg-vanta-fog/20 sm:block" aria-hidden="true" />

                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  {trainingCategories.map((cat) => {
                    const Icon = disciplineIcons[cat.key]
                    return (
                      <li key={cat.key} className="flex items-center gap-2.5 text-vanta-fog">
                        <Icon className="h-4 w-4 shrink-0 text-vanta-ember" />
                        <span className="font-mono text-[10px] uppercase tracking-widest2">{cat.label}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </RevealFade>
          </>
        )}
      </div>
    </section>
  )
}
