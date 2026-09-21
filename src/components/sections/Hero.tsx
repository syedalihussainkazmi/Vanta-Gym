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

export function Hero() {
  const { scrollTo } = useSmoothScroll()
  const bgRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.18 },
        { scale: 1, duration: 2.2, ease: 'power2.out' },
      )
      gsap.fromTo(
        vignetteRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 1.4, ease: 'power2.out', delay: 0.1 },
      )
    })
    return () => ctx.revert()
  }, [reducedMotion])

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

      <AnimatedBackground className="z-[11] mix-blend-screen opacity-70" />

      <BarbellIcon
        aria-hidden="true"
        className="vanta-float-a pointer-events-none absolute right-[6%] top-32 z-[12] hidden w-40 -rotate-12 text-vanta-ember/25 md:top-36 md:block lg:w-56"
      />
      <KettlebellIcon
        aria-hidden="true"
        className="vanta-float-c pointer-events-none absolute left-[7%] top-28 z-[12] hidden w-10 text-vanta-fog/20 md:top-32 md:block"
      />

      <div className="container-vanta relative z-20 flex flex-1 flex-col justify-between pb-8 pt-32 md:pb-10 md:pt-40">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-fog">
          <RevealText lines={['Vanta — Performance Club']} delay={0.6} />
        </p>

        <div>
          <h1 className="font-display text-display-1 font-extrabold uppercase text-vanta-white">
            <RevealText lines={['Forged', 'In Motion.']} delay={0.75} stagger={0.12} />
          </h1>

          <div className="mt-8 flex flex-col items-start justify-between gap-8 md:mt-10 md:flex-row md:items-end">
            <p className="max-w-md text-balance font-sans text-base text-vanta-fog md:text-lg">
              A performance club built for strength, conditioning, and recovery. No shortcuts.
              Train with intent.
            </p>
            <Button
              onClick={() => scrollTo('#philosophy')}
              variant="solid"
              className="shrink-0"
            >
              Enter Vanta
            </Button>
          </div>
        </div>

        <RevealFade delay={0.9} start="top 100%">
          <div className="flex flex-col gap-6 border-t border-vanta-fog/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
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

            <div className="flex items-center gap-3 text-vanta-fog">
              <span className="font-mono text-[10px] uppercase tracking-widest2">Scroll</span>
              <span className="relative block h-8 w-px overflow-hidden bg-vanta-steel/50 sm:h-10">
                <span className="scroll-cue-line absolute inset-x-0 top-0 h-full bg-vanta-white" />
              </span>
            </div>
          </div>
        </RevealFade>
      </div>
    </section>
  )
}
