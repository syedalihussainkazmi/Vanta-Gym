import { images } from '@/data/images'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealImage } from '@/components/ui/RevealImage'
import { RevealText } from '@/components/ui/RevealText'
import { RevealFade } from '@/components/ui/RevealFade'

const captions = [
  'The training floor — platforms and free weight bays',
  'Rack storage, organized by movement pattern',
  'Low, directional lighting across the main floor',
  'Architectural detail at the north entrance',
  'Open floor plan, built for barbell work',
  'The recovery wing, separated from the noise',
]

export function Space() {
  return (
    <section id="space" aria-label="The Space" className="relative bg-vanta-black py-28 md:py-40">
      <div className="container-vanta">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <RevealFade>
            <SectionLabel index="03" title="The Space" />
            <h2 className="mt-6 max-w-4xl font-display text-display-2 font-bold uppercase leading-[0.95] text-vanta-white">
              <RevealText lines={['Built Like', 'Architecture.']} />
            </h2>
          </RevealFade>
          <RevealFade delay={0.1} className="max-w-sm">
            <p className="text-balance font-sans text-vanta-fog">
              Every detail of the floor is deliberate — from the way light falls across the
              platforms to how the racks are laid out by movement pattern.
            </p>
          </RevealFade>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:mt-24 md:gap-x-8 md:gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealImage
              src={images.space[3].src(1600, 1100)}
              alt={captions[3]}
              wrapperClassName="aspect-[16/11] w-full"
              parallax
              parallaxAmount={40}
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
              {captions[3]}
            </p>
          </div>
          <div className="lg:col-span-5 lg:mt-20">
            <RevealImage
              src={images.space[0].src(1100, 1400)}
              alt={captions[0]}
              wrapperClassName="aspect-[4/5] w-full"
              parallax
              parallaxAmount={70}
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
              {captions[0]}
            </p>
          </div>

          <div className="lg:col-span-4">
            <RevealImage
              src={images.space[1].src(900, 1100)}
              alt={captions[1]}
              wrapperClassName="aspect-[4/5] w-full"
              parallax
              parallaxAmount={50}
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
              {captions[1]}
            </p>
          </div>
          <div className="lg:col-span-8 lg:mt-16">
            <RevealImage
              src={images.space[4].src(1600, 1000)}
              alt={captions[4]}
              wrapperClassName="aspect-[16/10] w-full"
              parallax
              parallaxAmount={35}
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
              {captions[4]}
            </p>
          </div>

          <div className="lg:col-span-6">
            <RevealImage
              src={images.space[2].src(1200, 1400)}
              alt={captions[2]}
              wrapperClassName="aspect-[6/7] w-full"
              parallax
              parallaxAmount={45}
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
              {captions[2]}
            </p>
          </div>
          <div className="lg:col-span-6 lg:mt-24">
            <RevealImage
              src={images.space[5].src(1200, 1400)}
              alt={captions[5]}
              wrapperClassName="aspect-[6/7] w-full"
              parallax
              parallaxAmount={60}
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
              {captions[5]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
