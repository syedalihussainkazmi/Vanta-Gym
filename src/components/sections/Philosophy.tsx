import { images } from '@/data/images'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealImage } from '@/components/ui/RevealImage'
import { RevealFade } from '@/components/ui/RevealFade'
import { ScrubReveal } from '@/components/ui/ScrubReveal'

export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-label="Philosophy"
      className="relative bg-vanta-bone py-28 text-vanta-black md:py-40"
    >
      <div className="container-vanta">
        <RevealFade>
          <SectionLabel index="02" title="Philosophy" light />
        </RevealFade>

        <div className="mt-14 grid grid-cols-1 gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7 lg:col-span-8">
            <ScrubReveal
              text="Training is not an appointment. It is a discipline."
              className="font-display text-display-2 font-bold uppercase leading-[0.98]"
            />
            <RevealFade delay={0.1} className="mt-10 max-w-md md:mt-14">
              <p className="text-balance font-sans text-base text-vanta-black/70 md:text-lg">
                Most gyms sell access. VANTA sells a standard — one you show up to meet, not one
                that's handed to you. The floor, the coaching, and the programming exist for a
                single purpose: consistent, deliberate work.
              </p>
            </RevealFade>
          </div>

          <div className="md:col-span-5 lg:col-span-4">
            <RevealImage
              src={images.philosophy.src(1000, 1300)}
              alt="An athlete's hands on a chalked barbell before a lift"
              wrapperClassName="aspect-[4/5] w-full md:mt-6"
              parallax
            />
          </div>
        </div>
      </div>
    </section>
  )
}
