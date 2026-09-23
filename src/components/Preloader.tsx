import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'

const DURATION_MS = 5000
const RADIUS = 46
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface PreloaderProps {
  /** Called once, right as the preloader begins dissolving, so the page
   * beneath can start its own entrance the moment the two start to blend. */
  onReveal: () => void
}

/** Full-screen brand loader: a five-second circular progress ring around a
 * pulsing mark, dissolving into the page rather than cutting to it. */
export function Preloader({ onReveal }: PreloaderProps) {
  const reducedMotion = useReducedMotion()
  const [finished, setFinished] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<SVGCircleElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const revealedRef = useRef(false)
  const onRevealRef = useRef(onReveal)
  const startedRef = useRef(false)

  useEffect(() => {
    onRevealRef.current = onReveal
  }, [onReveal])

  useEffect(() => {
    // Guards against ever running the timer twice — this effect must fire
    // exactly once per page load, regardless of how many times it's
    // re-invoked (StrictMode's dev-only double-invoke, or any future
    // dependency change): a second run would restart a fresh five-second
    // countdown that eventually animates refs from a preloader instance
    // that has already dissolved and unmounted.
    if (startedRef.current) return
    startedRef.current = true

    if (reducedMotion) {
      onRevealRef.current()
      setFinished(true)
      return
    }

    document.documentElement.style.overflow = 'hidden'
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(1, elapsed / DURATION_MS)

      if (progressRef.current) {
        progressRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - pct))
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(pct * 100)}%`
      }

      if (pct < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        exit()
      }
    }

    const exit = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = ''
          setFinished(true)
        },
      })
      tl.to(contentRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
      tl.add(() => {
        if (!revealedRef.current) {
          revealedRef.current = true
          onRevealRef.current()
        }
      }, '-=0.05')
      tl.to(rootRef.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.1')
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  if (finished) return null

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-vanta-black"
    >
      <AnimatedBackground />
      <div ref={contentRef} className="relative flex flex-col items-center gap-7">
        <div className="relative flex h-32 w-32 items-center justify-center md:h-40 md:w-40">
          <div className="vanta-spin-slow absolute inset-0 rounded-full border border-dashed border-vanta-steel/50" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="1" className="text-vanta-steel/30" />
            <circle
              ref={progressRef}
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-vanta-ember"
              style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE }}
            />
          </svg>
          <svg viewBox="0 0 64 64" className="vanta-pulse h-10 w-10 text-vanta-white md:h-12 md:w-12">
            <path d="M14 16H22L32 42L42 16H50L36 50H28L14 16Z" fill="currentColor" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="font-display text-xl font-extrabold uppercase tracking-tight text-vanta-white md:text-2xl">
            Vanta
          </span>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-vanta-mist">
            <span ref={percentRef}>0%</span>
            <span className="h-1 w-1 rounded-full bg-vanta-ember" aria-hidden="true" />
            <span>Entering Performance Club</span>
          </div>
        </div>
      </div>
    </div>
  )
}
