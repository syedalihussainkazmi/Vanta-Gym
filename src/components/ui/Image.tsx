import { useState, type ImgHTMLAttributes } from 'react'
import clsx from 'clsx'

interface VantaImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  wrapperClassName?: string
  overlay?: 'none' | 'soft' | 'strong' | 'duotone'
  eager?: boolean
}

/**
 * Image wrapper with a brand-colored fallback panel: if the remote photo
 * fails to load (or hasn't yet), the layout still reads as an intentional
 * dark panel rather than a broken-image icon.
 */
export function Image({
  alt,
  className,
  wrapperClassName,
  overlay = 'none',
  eager = false,
  ...imgProps
}: VantaImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className={clsx('relative overflow-hidden bg-vanta-graphite', wrapperClassName)}>
      {!errored && (
        <img
          {...imgProps}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={clsx(
            'h-full w-full object-cover transition-opacity duration-700 ease-out',
            loaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
        />
      )}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-vanta-graphite via-vanta-charcoal to-vanta-graphite"
        />
      )}
      {overlay === 'soft' && (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-vanta-black/70 via-vanta-black/10 to-transparent" />
      )}
      {overlay === 'strong' && (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-vanta-black/90 via-vanta-black/30 to-vanta-black/10" />
      )}
      {overlay === 'duotone' && (
        <div aria-hidden="true" className="absolute inset-0 bg-vanta-black/40 mix-blend-multiply" />
      )}
    </div>
  )
}
