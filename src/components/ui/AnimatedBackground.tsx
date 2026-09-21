import clsx from 'clsx'

interface AnimatedBackgroundProps {
  className?: string
  grain?: boolean
}

/**
 * Ambient, decorative backdrop: three slow-drifting blurred color fields plus
 * an optional flickering film-grain layer. Pure CSS (transform/opacity only),
 * so it's cheap to run and automatically frozen by the global
 * prefers-reduced-motion rule. Place as the first child of a
 * `relative overflow-hidden` section.
 */
export function AnimatedBackground({ className, grain = true }: AnimatedBackgroundProps) {
  return (
    <div aria-hidden="true" className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="vanta-blob vanta-blob-a" />
      <div className="vanta-blob vanta-blob-b" />
      <div className="vanta-blob vanta-blob-c" />
      {grain && <div className="vanta-grain" />}
    </div>
  )
}
