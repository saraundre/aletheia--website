import HeroSection from '@/components/sections/home/HeroSection'
import WeAreSection from '@/components/sections/home/WeAreSection'
import WhatWeDoSection from '@/components/sections/home/WhatWeDoSection'
import CollaboratorsCarousel from '@/components/sections/home/CollaboratorsCarousel'
import SignatureSection from '@/components/sections/home/SignatureSection'

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