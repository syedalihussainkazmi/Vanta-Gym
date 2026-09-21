import { nav, contactDetails } from '@/data/content'
import { useSmoothScroll } from '@/lib/SmoothScroll'

export function Footer() {
  const { scrollTo } = useSmoothScroll()
  const year = new Date().getFullYear()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollTo(href, { offset: -80 })
  }

  return (
    <footer className="relative border-t border-vanta-steel/25 bg-vanta-black pb-10 pt-20 md:pt-28">
      <div className="container-vanta">
        <div className="flex flex-col justify-between gap-14 md:flex-row">
          <div>
            <a
              href="#top"
              onClick={(e) => handleClick(e, '#top')}
              className="font-display text-3xl font-extrabold uppercase tracking-tight text-vanta-white md:text-4xl"
            >
              Vanta
            </a>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
              Performance Club
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4">
            {[...nav, { label: 'Contact', href: '#contact' }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="font-mono text-xs uppercase tracking-widest2 text-vanta-fog transition-colors hover:text-vanta-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            {contactDetails.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest2 text-vanta-fog transition-colors hover:text-vanta-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-4 border-t border-vanta-steel/20 pt-8 text-vanta-mist sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-widest2">
            © {year} Vanta Performance Club. A fictional concept created for this design project.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest2">No Shortcuts.</p>
        </div>
      </div>
    </footer>
  )
}
