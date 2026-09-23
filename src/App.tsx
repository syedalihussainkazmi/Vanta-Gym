import { useState } from 'react'
import { SmoothScrollProvider } from '@/lib/SmoothScroll'
import { CursorProvider } from '@/lib/Cursor'
import { MembershipInterestProvider } from '@/lib/MembershipInterest'
import { SkipLink } from '@/components/SkipLink'
import { Preloader } from '@/components/Preloader'
import { Navbar } from '@/components/nav/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Philosophy } from '@/components/sections/Philosophy'
import { Space } from '@/components/sections/Space'
import { Training } from '@/components/sections/Training'
import { Performance } from '@/components/sections/Performance'
import { Coaching } from '@/components/sections/Coaching'
import { Recovery } from '@/components/sections/Recovery'
import { Membership } from '@/components/sections/Membership'
import { Testimonials } from '@/components/sections/Testimonials'
import { Location } from '@/components/sections/Location'
import { FinalCta } from '@/components/sections/FinalCta'
import { Footer } from '@/components/Footer'

function App() {
  const [heroReady, setHeroReady] = useState(false)

  return (
    <SmoothScrollProvider>
      <CursorProvider>
        <MembershipInterestProvider>
          <Preloader onReveal={() => setHeroReady(true)} />
          <SkipLink />
          <Navbar />
          <main id="top-content" tabIndex={-1} className="focus:outline-none">
            <Hero ready={heroReady} />
            <Philosophy />
            <Space />
            <Training />
            <Performance />
            <Coaching />
            <Recovery />
            <Membership />
            <Testimonials />
            <Location />
            <FinalCta />
          </main>
          <Footer />
        </MembershipInterestProvider>
      </CursorProvider>
    </SmoothScrollProvider>
  )
}

export default App
