import HeroSection from '@/components/sections/HeroSection'
import WeAreSection from '@/components/sections/WeAreSection'
import WhatWeDoSection from '@/components/sections/WhatWeDoSection'
import CollaboratorsCarousel from '@/components/sections/CollaboratorsCarousel'
import SignatureSection from '@/components/sections/SignatureSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WeAreSection />
      <WhatWeDoSection />
      <CollaboratorsCarousel />
      <SignatureSection />
    </div>
  )
} 