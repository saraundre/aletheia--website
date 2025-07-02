import CollaboratorsCarousel from '@/components/sections/home/CollaboratorsCarousel'
import SignatureSection from '@/components/sections/home/SignatureSection'
import AletheiaHeroSection from '@/components/sections/home/AletheiaHeroSection'
import AnimatedQuotesSection from '@/components/sections/home/AnimatedQuotesSection'
import WeAreSection from '@/components/sections/home/WeAreSection'
import WhatWeDoSection from '@/components/sections/home/WhatWeDoSection'

// STEM for All sections
import StemForAllHero from '@/components/sections/stem-for-all/StemHeroSection'
import VideoContentSection from '@/components/sections/stem-for-all/VideoContentSection'
import CoreValuesSection from '@/components/sections/stem-for-all/CoreValuesSection'
import InspirationalQuoteSection from '@/components/sections/stem-for-all/InspirationalQuoteSection'
import SparkOSHeroSection from '@/components/sections/stem-for-all/SparkOSHeroSection'
import BuiltForEveryoneSection from '@/components/sections/stem-for-all/BuiltForEveryoneSection'
import CoreFeaturesSection from '@/components/sections/stem-for-all/CoreFeaturesSection'
import StemCallToActionSection from '@/components/sections/stem-for-all/StemCallToActionSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AnimatedQuotesSection />
      <AletheiaHeroSection />
      <WeAreSection />
      <WhatWeDoSection />
      <CollaboratorsCarousel />
      <SignatureSection />
      
      {/* STEM for All Sections */}
      <StemForAllHero />
      <VideoContentSection />
      <CoreValuesSection />
      <InspirationalQuoteSection />
      <SparkOSHeroSection />
      <BuiltForEveryoneSection />
      <CoreFeaturesSection />
      <StemCallToActionSection />
    </div>
  )
} 