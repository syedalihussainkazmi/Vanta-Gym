import { useSmoothScroll } from '@/lib/SmoothScroll'

export function SkipLink() {
  const { scrollTo } = useSmoothScroll()

  return (
    <a
      href="#top-content"
      onClick={(e) => {
        e.preventDefault()
        scrollTo('#top-content')
        document.getElementById('top-content')?.focus()
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-vanta-white focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest2 focus:text-vanta-black"
    >
      Skip to content
    </a>
  )
}
