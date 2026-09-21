import { useEffect, useRef, type ImgHTMLAttributes } from 'react'
import clsx from 'clsx'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { Image } from './Image'

interface RevealImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  wrapperClassName?: string
  overlay?: 'none' | 'soft' | 'strong' | 'duotone'
  eager?: boolean
  parallax?: boolean
  parallaxAmount?: number
  start?: string
}

/** Reveals an image with a rising clip-path wipe, with optional subtle parallax drift. */
export function RevealImage({
  wrapperClassName,
  parallax = false,
  parallaxAmount = 60,
  start = 'top 85%',
  ...imgProps
}: RevealImageProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    if (reducedMotion) {
      gsap.set(outer, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(inner, { scale: 1, y: 0 })
      return
    }

    gsap.set(outer, { clipPath: 'inset(0% 0% 100% 0%)' })
    gsap.set(inner, { scale: 1.22, y: 0 })

    const ctx = gsap.context(() => {
      gsap.to(outer, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: outer, start, toggleActions: 'play none none none' },
      })
      gsap.to(inner, {
        scale: 1,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: outer, start, toggleActions: 'play none none none' },
      })

      if (parallax) {
        gsap.to(inner, {
          y: -parallaxAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: outer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }
    }, outer)

    return () => ctx.revert()
  }, [reducedMotion, parallax, parallaxAmount, start])

  return (
    <div ref={outerRef} className={clsx('relative overflow-hidden', wrapperClassName)}>
      <div ref={innerRef} className="h-full w-full will-change-transform">
        <Image {...imgProps} className={clsx('h-full w-full', imgProps.className)} />
      </div>
    </div>
  )
}
