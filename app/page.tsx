import CollaboratorsCarousel from '@/components/sections/home/CollaboratorsCarousel'
import SignatureSection from '@/components/sections/home/SignatureSection'
import AnimatedQuotesSection from '@/components/sections/home/AnimatedQuotesSection'

export default function HomePage() {
  return (
    <div className="min-h-screen snap-y snap-mandatory">
      <AnimatedQuotesSection />
      <SignatureSection />
      <CollaboratorsCarousel />
    </div>
  )
} 