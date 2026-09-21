import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface RevealTextProps {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  start?: string
}

/** Masks each line and slides it up into view when scrolled into range. */
export function RevealText({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  start = 'top 88%',
}: RevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const targets = el.querySelectorAll('[data-reveal-line]')

    if (reducedMotion) {
      gsap.set(targets, { yPercent: 0, opacity: 1 })
      return
    }

    gsap.set(targets, { yPercent: 112, opacity: 1 })

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.15,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion, delay, stagger, start])

  return (
    <span ref={containerRef} className={clsx('inline', className)}>
      {lines.map((line, i) => (
        <span key={`${i}-${line}`} className={clsx('line-mask', lineClassName)}>
          <span data-reveal-line className="inline-block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </span>
  )
}
