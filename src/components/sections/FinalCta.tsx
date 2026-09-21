import { images } from '@/data/images'
import { Image } from '@/components/ui/Image'
import { RevealText } from '@/components/ui/RevealText'
import { RevealFade } from '@/components/ui/RevealFade'
import { Button } from '@/components/ui/Button'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { useSmoothScroll } from '@/lib/SmoothScroll'

export function FinalCta() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section
      id="join"
      aria-label="Start Training"
      className="relative flex min-h-[80vh] w-full flex-col justify-end overflow-hidden bg-vanta-black md:min-h-screen"
    >
      <div className="absolute inset-0">
        <Image
          src={images.finalCta.src(2400, 1600)}
          alt="An athlete pausing mid-session, focused and determined"
          overlay="strong"
          wrapperClassName="h-full w-full"
        />
      </div>

      <AnimatedBackground className="z-[5] mix-blend-screen opacity-60" />

      <div className="container-vanta relative z-10 flex flex-col gap-10 pb-24 pt-40 md:flex-row md:items-end md:justify-between md:pb-32">
        <h2 className="font-display text-display-1 font-extrabold uppercase leading-[0.9] text-vanta-white">
          <RevealText lines={['Ready', 'To Move?']} />
        </h2>
        <RevealFade delay={0.15}>
          <Button onClick={() => scrollTo('#membership')} variant="solid" className="text-sm">
            Start Training
          </Button>
        </RevealFade>
      </div>
    </section>
  )
}
