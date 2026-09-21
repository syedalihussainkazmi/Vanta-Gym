import { useEffect, useRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface RevealFadeProps {
  children: ReactNode
  className?: string
  y?: number
  delay?: number
  duration?: number
  start?: string
}

export function RevealFade({
  children,
  className,
  y = 32,
  delay = 0,
  duration = 1,
  start = 'top 90%',
}: RevealFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    gsap.set(el, { opacity: 0, y })

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion, y, delay, duration, start])

  return (
    <div ref={ref} className={clsx('will-change-transform', className)}>
      {children}
    </div>
  )
}
