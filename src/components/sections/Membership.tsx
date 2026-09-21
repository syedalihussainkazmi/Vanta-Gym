import clsx from 'clsx'
import { membershipTiers } from '@/data/content'
import { RevealFade } from '@/components/ui/RevealFade'
import { RevealText } from '@/components/ui/RevealText'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { useSmoothScroll } from '@/lib/SmoothScroll'
import { useMembershipInterest } from '@/lib/MembershipInterest'

export function Membership() {
  const { scrollTo } = useSmoothScroll()
  const { setInterest } = useMembershipInterest()

  const handleSelect = (tierName: string) => {
    setInterest(tierName)
    scrollTo('#contact', { offset: -80 })
  }

  return (
    <section id="membership" aria-label="Membership" className="relative bg-vanta-charcoal py-28 md:py-40">
      <div className="container-vanta">
        <RevealFade>
          <SectionLabel index="08" title="Membership" />
        </RevealFade>
        <h2 className="mt-6 max-w-2xl font-display text-display-2 font-bold uppercase leading-[0.95] text-vanta-white">
          <RevealText lines={['Your Training', 'Starts Here.']} />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-vanta-steel/25 md:mt-20 md:grid-cols-3">
          {membershipTiers.map((tier, i) => (
            <RevealFade key={tier.key} delay={i * 0.08} className="h-full">
              <div
                className={clsx(
                  'flex h-full flex-col justify-between p-8 transition-transform duration-500 ease-out hover:-translate-y-1.5 md:p-10',
                  tier.featured ? 'bg-vanta-white text-vanta-black' : 'bg-vanta-charcoal text-vanta-white',
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-widest2 opacity-60">
                      {tier.featured ? 'Recommended' : `0${i + 1}`}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold uppercase leading-tight md:text-3xl">
                    {tier.name}
                  </h3>
                  <p
                    className={clsx(
                      'mt-2 text-sm',
                      tier.featured ? 'text-vanta-black/60' : 'text-vanta-fog',
                    )}
                  >
                    {tier.tagline}
                  </p>

                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold md:text-5xl">{tier.price}</span>
                    <span className={clsx('font-mono text-xs', tier.featured ? 'text-vanta-black/65' : 'text-vanta-mist')}>
                      {tier.period}
                    </span>
                  </div>

                  <ul className="mt-8 flex flex-col gap-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className={clsx(
                          'flex items-start gap-3 text-sm',
                          tier.featured ? 'text-vanta-black/80' : 'text-vanta-fog',
                        )}
                      >
                        <span
                          className={clsx('mt-2 h-px w-4 shrink-0', tier.featured ? 'bg-vanta-black/40' : 'bg-vanta-fog/50')}
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleSelect(tier.name)}
                  variant={tier.featured ? 'solid' : 'outline'}
                  className={clsx(
                    'mt-10 w-full justify-center',
                    tier.featured && '!bg-vanta-black !text-vanta-white hover:!bg-vanta-ember',
                  )}
                >
                  Become a Member
                </Button>
              </div>
            </RevealFade>
          ))}
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase tracking-widest2 text-vanta-mist">
          VANTA is a concept performance club created for this design project — membership tiers and
          pricing shown are illustrative.
        </p>
      </div>
    </section>
  )
}
