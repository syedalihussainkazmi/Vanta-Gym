import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { nav } from '@/data/content'
import { useSmoothScroll } from '@/lib/SmoothScroll'
import { useCursor } from '@/lib/Cursor'
import { Button } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollTo } = useSmoothScroll()
  const { setVariant, clearVariant } = useCursor()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollTo(href, { offset: -96 })
  }

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out',
          scrolled || menuOpen
            ? 'border-b border-vanta-steel/30 bg-vanta-black/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Primary"
          className="container-vanta flex h-20 items-center justify-between md:h-24"
        >
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="font-display text-xl font-extrabold tracking-tight text-vanta-white md:text-2xl"
            onMouseEnter={() => setVariant('enter')}
            onMouseLeave={clearVariant}
          >
            VANTA
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setVariant('enter')}
                  onMouseLeave={clearVariant}
                  className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-fog transition-colors duration-300 hover:text-vanta-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button
              href="#membership"
              onClick={(e) => handleNavClick(e, '#membership')}
              variant="outline"
              className="!px-6 !py-3"
            >
              Join Vanta
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span
              className={clsx(
                'h-px w-6 bg-vanta-white transition-transform duration-300 ease-out',
                menuOpen && 'translate-y-[3.5px] rotate-45',
              )}
            />
            <span
              className={clsx(
                'h-px w-6 bg-vanta-white transition-all duration-300 ease-out',
                menuOpen && '-translate-y-[3.5px] -rotate-45',
              )}
            />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
