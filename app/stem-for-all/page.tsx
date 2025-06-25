import StemForAllHero from '@/components/sections/stem-for-all/StemHeroSection'
import VideoContentSection from '@/components/sections/stem-for-all/VideoContentSection'
import CoreValuesSection from '@/components/sections/stem-for-all/CoreValuesSection'
import InspirationalQuoteSection from '@/components/sections/stem-for-all/InspirationalQuoteSection'
import SparkOSHeroSection from '@/components/sections/stem-for-all/SparkOSHeroSection'
import BuiltForEveryoneSection from '@/components/sections/stem-for-all/BuiltForEveryoneSection'
import CoreFeaturesSection from '@/components/sections/stem-for-all/CoreFeaturesSection'
import StemCallToActionSection from '@/components/sections/stem-for-all/StemCallToActionSection'

export const metadata = {
  title: 'STEM For All - Equitable Learning Opportunities | Aletheia',
  description: 'Creating accessible, inclusive learning experiences that reach every student, regardless of background or ability. Join the movement for equitable STEM education.',
  keywords: ['STEM education', 'equitable learning', 'accessible education', 'inclusive technology', 'educational innovation'],
}

export default function StemForAllPage() {
  return (
    <div className="min-h-screen">
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