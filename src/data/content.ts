import { images } from './images'

export const nav = [
  { label: 'Training', href: '#training' },
  { label: 'Space', href: '#space' },
  { label: 'Coaching', href: '#coaching' },
  { label: 'Membership', href: '#membership' },
]

export const trainingCategories = [
  {
    key: 'strength',
    label: 'Strength',
    index: '01',
    copy: 'Compound movement, progressive load, and technical precision. The foundation everything else is built on.',
    detail: ['Barbell & platform work', 'Programmed progression', 'Technical coaching on every lift'],
    image: images.training.strength,
  },
  {
    key: 'conditioning',
    label: 'Conditioning',
    index: '02',
    copy: 'Work capacity built under fatigue. Engines get built here, not in comfort.',
    detail: ['Mixed-modal energy systems work', 'Threshold & interval training', 'Programming that scales to you'],
    image: images.training.conditioning,
  },
  {
    key: 'performance',
    label: 'Performance',
    index: '03',
    copy: 'Speed, power, and movement quality for people who compete — against others or themselves.',
    detail: ['Sprint & plyometric mechanics', 'Force and rate-of-force development', 'Sport-specific movement prep'],
    image: images.training.performance,
  },
  {
    key: 'recovery',
    label: 'Recovery',
    index: '04',
    copy: 'Training is the stimulus. Recovery is where the adaptation actually happens.',
    detail: ['Guided mobility sessions', 'Structured deload programming', 'Recovery space access included'],
    image: images.training.recovery,
  },
] as const

export const performancePillars = [
  {
    label: 'Power',
    copy: 'Rate of force development, trained deliberately — not as a side effect of getting tired.',
  },
  {
    label: 'Speed',
    copy: 'Mechanics first. Sprint technique and reactive drills built into every performance block.',
  },
  {
    label: 'Endurance',
    copy: 'Aerobic capacity as a training pillar, programmed with the same rigor as strength work.',
  },
  {
    label: 'Mobility',
    copy: 'Range you can actually use under load — assessed, trained, and re-tested.',
  },
] as const

export const coaches = [
  {
    name: 'Marcus Webb',
    specialty: 'Strength & Barbell',
    bio: 'Twelve years coaching competitive powerlifters and first-time lifters alike. Marcus builds programs around what your body can do today.',
    image: images.coaches[0],
  },
  {
    name: 'Dana Ilic',
    specialty: 'Conditioning',
    bio: 'Former collegiate rower turned conditioning coach. Dana designs sessions that make fatigue a tool, not an obstacle.',
    image: images.coaches[1],
  },
  {
    name: 'Theo Nakamura',
    specialty: 'Performance & Speed',
    bio: 'Works with athletes preparing for combine testing and off-season blocks. Precise on mechanics, patient on progress.',
    image: images.coaches[2],
  },
  {
    name: 'Priya Chandra',
    specialty: 'Mobility & Recovery',
    bio: 'Trained in movement therapy before moving into performance coaching. Priya treats recovery as programming, not an afterthought.',
    image: images.coaches[3],
  },
] as const

export const membershipTiers = [
  {
    key: 'standard',
    name: 'Vanta Standard',
    price: '$189',
    period: '/month',
    tagline: 'Full access to the floor.',
    features: [
      'Unlimited training floor access',
      'Strength & conditioning programming',
      'Locker room & shower facilities',
      'Member app with session tracking',
    ],
    featured: false,
  },
  {
    key: 'performance',
    name: 'Vanta Performance',
    price: '$349',
    period: '/month',
    tagline: 'Coached, structured, accountable.',
    features: [
      'Everything in Standard',
      'Two coached sessions per week',
      'Quarterly performance assessment',
      'Priority booking on all sessions',
    ],
    featured: true,
  },
  {
    key: 'elite',
    name: 'Vanta Elite',
    price: '$650',
    period: '/month',
    tagline: 'A program built around you.',
    features: [
      'Everything in Performance',
      'Dedicated coach & custom programming',
      'Unlimited recovery space access',
      'Direct coach messaging',
    ],
    featured: false,
  },
] as const

export const testimonials = [
  {
    quote: 'VANTA changed the way I train. The coaching is precise — nothing generic about it.',
    name: 'Elena Cross',
    detail: 'Performance Training · Member since 2023',
    image: images.members[0],
  },
  {
    quote: 'I have trained at a dozen gyms. This is the first one that programs like it means it.',
    name: 'Marcus Odell',
    detail: 'Strength Training · Member since 2022',
    image: images.members[1],
  },
  {
    quote: 'The recovery space alone is worth it. I actually look forward to the sessions I used to skip.',
    name: 'Naomi Reyes',
    detail: 'Vanta Elite · Member since 2024',
    image: images.members[2],
  },
] as const

export const recoveryOfferings = [
  {
    label: 'Guided Mobility',
    copy: 'Structured mobility sessions led by our recovery coaches, built into your weekly programming.',
    image: images.recovery[0],
  },
  {
    label: 'Recovery Suite',
    copy: 'A dedicated space for the work that happens after training — separate from the floor, built for it.',
    image: images.recovery[1],
  },
  {
    label: 'Cooldown Protocols',
    copy: 'Post-session stretching and breathwork protocols, part of the program rather than an afterthought.',
    image: images.recovery[2],
  },
] as const

export const contactDetails = {
  address: ['123 Vanta Avenue', 'New York, NY 10001'],
  email: 'train@vantaclub.example',
  phone: '+1 (212) 555-0134',
  hours: [
    { days: 'Monday — Friday', time: '05:00 — 23:00' },
    { days: 'Saturday — Sunday', time: '07:00 — 21:00' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/vanta.club' },
    { label: 'YouTube', href: 'https://youtube.com/@vanta.club' },
    { label: 'Strava', href: 'https://strava.com/clubs/vanta' },
  ],
}
