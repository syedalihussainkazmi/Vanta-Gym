import { useEffect, useRef } from 'react'
import { nav, contactDetails } from '@/data/content'
import { useSmoothScroll } from '@/lib/SmoothScroll'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/lib/useReducedMotion'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const { scrollTo, stop, start } = useSmoothScroll()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const panel = panelRef.current
    const links = linksRef.current?.querySelectorAll('li')
    if (!panel) return

    if (open) {
      stop()
      if (reducedMotion) {
        gsap.set(panel, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(links ?? [], { y: 0, opacity: 1 })
      } else {
        gsap.set(panel, { clipPath: 'inset(0% 0% 100% 0%)' })
        gsap.set(links ?? [], { y: 24, opacity: 0 })
        const tl = gsap.timeline()
        tl.to(panel, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power3.out' }).to(
          links ?? [],
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
          '-=0.25',
        )
      }
      const firstLink = linksRef.current?.querySelector('a')
      firstLink?.focus()
    } else {
      start()
      if (!reducedMotion) {
        gsap.to(panel, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'power3.inOut' })
      } else {
        gsap.set(panel, { clipPath: 'inset(0% 0% 100% 0%)' })
      }
    }
  }, [open, reducedMotion, stop, start])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleClick = (href: string) => {
    onClose()
    window.setTimeout(() => scrollTo(href, { offset: -80 }), 350)
  }

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      className="fixed inset-0 z-40 flex flex-col justify-between bg-vanta-black px-6 pb-10 pt-28 lg:hidden"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      aria-hidden={!open}
      inert={!open || undefined}
    >
      <ul ref={linksRef} className="flex flex-col gap-2">
        {nav.map((item) => (
          <li key={item.href} className="border-b border-vanta-steel/30 py-4">
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleClick(item.href)
              }}
              className="font-display text-4xl font-bold text-vanta-white"
            >
              {item.label}
            </a>
          </li>
        ))}
        <li className="pt-6">
          <a
            href="#membership"
            onClick={(e) => {
              e.preventDefault()
              handleClick('#membership')
            }}
            className="font-mono text-sm uppercase tracking-widest2 text-vanta-ember"
          >
            Join Vanta →
          </a>
        </li>
      </ul>

      <div className="flex flex-col gap-4 font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
        <span>{contactDetails.email}</span>
        <div className="flex gap-6">
          {contactDetails.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-vanta-white">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
