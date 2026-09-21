import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { gsap } from './gsap'

type CursorVariant = 'default' | 'view' | 'enter' | 'drag'

interface CursorContextValue {
  setVariant: (variant: CursorVariant, label?: string) => void
  clearVariant: () => void
}

const CursorContext = createContext<CursorContextValue | null>(null)

export function useCursor(): CursorContextValue {
  const ctx = useContext(CursorContext)
  if (!ctx) {
    return { setVariant: () => {}, clearVariant: () => {} }
  }
  return ctx
}

const SIZES: Record<CursorVariant, number> = {
  default: 14,
  view: 84,
  enter: 84,
  drag: 72,
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [supportsCursor, setSupportsCursor] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false,
  )
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [variant, setVariantState] = useState<CursorVariant>('default')
  const [label, setLabel] = useState('')

  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setSupportsCursor(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!supportsCursor) return

    const xTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.35, ease: 'power3.out' })
    const xLabelTo = gsap.quickTo(labelRef.current, 'x', { duration: 0.45, ease: 'power3.out' })
    const yLabelTo = gsap.quickTo(labelRef.current, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      dotRef.current?.classList.add('is-active')
      xTo(e.clientX)
      yTo(e.clientY)
      xLabelTo(e.clientX)
      yLabelTo(e.clientY)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [supportsCursor])

  useEffect(() => {
    if (!supportsCursor || !dotRef.current || !labelRef.current) return
    const size = SIZES[variant]
    gsap.to(dotRef.current, {
      width: size,
      height: size,
      marginLeft: -size / 2,
      marginTop: -size / 2,
      backgroundColor: variant === 'default' ? '#faf7ee' : '#faf7ee',
      duration: 0.35,
      ease: 'power3.out',
    })
    gsap.to(labelRef.current, {
      opacity: variant === 'default' ? 0 : 1,
      width: size,
      height: size,
      marginLeft: -size / 2,
      marginTop: -size / 2,
      duration: 0.35,
      ease: 'power3.out',
    })
  }, [variant, supportsCursor])

  const value = useMemo<CursorContextValue>(
    () => ({
      setVariant: (v, l) => {
        setVariantState(v)
        setLabel(l ?? '')
      },
      clearVariant: () => {
        setVariantState('default')
        setLabel('')
      },
    }),
    [],
  )

  return (
    <CursorContext.Provider value={value}>
      {children}
      {supportsCursor && (
        <>
          <div ref={dotRef} className="vanta-cursor" aria-hidden="true" />
          <div ref={labelRef} className="vanta-cursor-label" aria-hidden="true">
            {label}
          </div>
        </>
      )}
    </CursorContext.Provider>
  )
}
