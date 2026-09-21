import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface ScrubRevealProps {
  text: string
  className?: string
  dimColor?: string
  litColor?: string
}

/**
 * Splits text into words that brighten progressively as the block scrolls
 * through the viewport — reading pace mapped to scroll position.
 */
export function ScrubReveal({
  text,
  className,
  dimColor = 'rgba(16,35,26,0.22)',
  litColor = '#10231a',
}: ScrubRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = el.querySelectorAll('[data-word]')

    if (reducedMotion) {
      gsap.set(targets, { color: litColor })
      return
    }

    gsap.set(targets, { color: dimColor })

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        color: litColor,
        stagger: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion, dimColor, litColor])

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${i}-${word}`} data-word className="mr-[0.28em] inline-block" style={{ color: dimColor }}>
          {word}
        </span>
      ))}
    </p>
  )
}
