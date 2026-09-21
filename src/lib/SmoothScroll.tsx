import Lenis from 'lenis'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import { gsap, ScrollTrigger } from './gsap'
import { useReducedMotion } from './useReducedMotion'

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void
  stop: () => void
  start: () => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll(): SmoothScrollContextValue {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) throw new Error('useSmoothScroll must be used within SmoothScrollProvider')
  return ctx
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      scrollTo: (target, options) => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, { offset: options?.offset ?? 0, duration: 1.4 })
        } else if (typeof target === 'string') {
          document.querySelector(target)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
        }
      },
      stop: () => {
        lenisRef.current?.stop()
        document.documentElement.style.overflow = 'hidden'
      },
      start: () => {
        lenisRef.current?.start()
        document.documentElement.style.overflow = ''
      },
    }),
    [reducedMotion],
  )

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}
