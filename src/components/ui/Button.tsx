import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { useCursor } from '@/lib/Cursor'

const base =
  'group relative inline-flex items-center gap-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest2 transition duration-300 ease-out hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-offset-4'

const variants = {
  solid: 'bg-vanta-white text-vanta-black px-8 py-4 hover:bg-vanta-ember hover:text-vanta-black',
  outline: 'border border-vanta-fog/40 text-vanta-white px-8 py-4 hover:border-vanta-ember hover:text-vanta-ember',
  ghost: 'text-vanta-white px-0 py-2',
}

interface CommonProps {
  variant?: keyof typeof variants
  arrow?: boolean
  className?: string
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type VantaButtonProps = ButtonProps | AnchorProps

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, VantaButtonProps>(
  function Button({ variant = 'solid', arrow = true, className, children, ...props }, ref) {
    const { setVariant, clearVariant } = useCursor()
    const content = (
      <>
        <span>{children}</span>
        {arrow && (
          <span
            className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            →
          </span>
        )}
      </>
    )

    const sharedHandlers = {
      onMouseEnter: () => setVariant('enter'),
      onMouseLeave: () => clearVariant(),
    }

    if (props.href) {
      const anchorProps = props as AnchorProps
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={clsx(base, variants[variant], className)}
          {...sharedHandlers}
          {...anchorProps}
        >
          {content}
        </a>
      )
    }

    const buttonProps = props as ButtonProps
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonProps.type ?? 'button'}
        className={clsx(base, variants[variant], className)}
        {...sharedHandlers}
        {...buttonProps}
      >
        {content}
      </button>
    )
  },
)
