import StemHeroSection from '@/components/sections/StemHeroSection'
import VideoContentSection from '@/components/sections/VideoContentSection'
import CoreValuesSection from '@/components/sections/CoreValuesSection'
import InspirationalQuoteSection from '@/components/sections/InspirationalQuoteSection'
import StemCallToActionSection from '@/components/sections/StemCallToActionSection'

export const metadata = {
  title: 'STEM For All - Equitable Learning Opportunities | Aletheia',
  description: 'Creating accessible, inclusive learning experiences that reach every student, regardless of background or ability. Join the movement for equitable STEM education.',
  keywords: ['STEM education', 'equitable learning', 'accessible education', 'inclusive technology', 'educational innovation'],
}

export default function StemForAllPage() {
  return (
    <div className="min-h-screen">
      <StemHeroSection />
      <VideoContentSection />
      <CoreValuesSection />
      <InspirationalQuoteSection />
      <StemCallToActionSection />
    </div>
  )
} 