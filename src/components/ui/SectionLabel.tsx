import clsx from 'clsx'

interface SectionLabelProps {
  index: string
  title: string
  className?: string
  light?: boolean
}

export function SectionLabel({ index, title, className, light = false }: SectionLabelProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest2',
        light ? 'text-vanta-black/50' : 'text-vanta-mist',
        className,
      )}
    >
      <span>{index}</span>
      <span className={clsx('h-px w-10', light ? 'bg-vanta-black/30' : 'bg-vanta-steel')} />
      <span>{title}</span>
    </div>
  )
}
