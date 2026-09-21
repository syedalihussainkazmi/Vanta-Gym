import type { SVGProps } from 'react'

/**
 * Hand-drawn-style line icons, built as plain stroked SVG paths — no stock
 * clipart, no raster assets. Consistent 1.6px stroke, round caps/joins, and
 * `currentColor` so each icon inherits its context's color.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function BarbellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 24" {...base} {...props}>
      <line x1="4" y1="12" x2="60" y2="12" />
      <rect x="9" y="4" width="5" height="16" rx="1.2" />
      <rect x="16" y="7" width="4" height="10" rx="1" />
      <rect x="50" y="4" width="5" height="16" rx="1.2" />
      <rect x="44" y="7" width="4" height="10" rx="1" />
    </svg>
  )
}

export function KettlebellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 44" {...base} {...props}>
      <path d="M14 14c0-4.5 2.7-8 6-8s6 3.5 6 8" />
      <rect x="12" y="12" width="16" height="4" rx="1.5" />
      <path d="M13 16c-5.5 2.4-9 7.8-9 13.5C4 38 11.2 44 20 44s16-6 16-14.5c0-5.7-3.5-11.1-9-13.5" />
    </svg>
  )
}

export function DumbbellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 56 24" {...base} {...props}>
      <line x1="20" y1="12" x2="36" y2="12" />
      <rect x="4" y="6" width="7" height="12" rx="1.5" />
      <rect x="12" y="9" width="4" height="6" rx="1" />
      <rect x="45" y="6" width="7" height="12" rx="1.5" />
      <rect x="40" y="9" width="4" height="6" rx="1" />
    </svg>
  )
}

export function PulseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 24" {...base} {...props}>
      <path d="M2 13h9l3-8 6 18 4-13 3 3h19" />
    </svg>
  )
}

export function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 32" {...base} {...props}>
      <path d="M14 2 4 18h7l-1 12 11-17h-7l1-11z" strokeLinejoin="round" />
    </svg>
  )
}
