"use client"

import { Home, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

function CollaboratorsCarousel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const collaborators = [
    "Science Centre Singapore",
    "National Library Board",
    "Rakuten Asia",
    "Child Street 11",
    "Mom Don't Cry Foundation",
    "National University Singapore",
    "Maker Festival",
    "Gaming & Robotics Society",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-16 bg-neutral-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="w-12 h-px bg-neutral-300 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-neutral-900 mb-8">
              Trusted by
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-2xl mx-auto">
              Partnering with leading organizations to create meaningful impact.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <motion.div variants={itemVariants} className="relative overflow-hidden">
            {/* First Row - Moving Right */}
            <div className="flex space-x-8 mb-8 animate-scroll-right">
              {[...collaborators, ...collaborators].map((collaborator, index) => (
                <motion.div
                  key={`row1-${collaborator}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow px-8 py-6 min-w-[280px] text-center group">
                    <div className="w-12 h-12 bg-neutral-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-neutral-300 transition-colors duration-300">
                      <span className="text-neutral-600 font-medium text-lg">
                        {collaborator
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300">
                      {collaborator}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Row - Moving Left */}
            <div className="flex space-x-8 animate-scroll-left">
              {[...collaborators.slice().reverse(), ...collaborators.slice().reverse()].map((collaborator, index) => (
                <motion.div
                  key={`row2-${collaborator}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow px-8 py-6 min-w-[280px] text-center group">
                    <div className="w-12 h-12 bg-neutral-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-neutral-300 transition-colors duration-300">
                      <span className="text-neutral-600 font-medium text-lg">
                        {collaborator
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300">
                      {collaborator}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Text */}
          <motion.div variants={itemVariants} className="mt-16">
            <p className="text-neutral-400 text-sm italic">Building partnerships that matter</p>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }
        
        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-sm font-normal tracking-wide hover:opacity-70 transition-opacity">
              Aletheia
            </Link>
            <button onClick={toggleMenu} className="hover:opacity-70 transition-opacity" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Home className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-50/95 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-8">
              <nav className="space-y-6">
                <Link
                  href="/stem-for-all"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stem for All
                </Link>
                <Link
                  href="/tech-for-good"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tech4All
                </Link>
                <Link
                  href="/about"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/gallery"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/contact"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section - Company Logo */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-neutral-200 rounded-lg flex items-center justify-center">
                <span className="text-neutral-500 text-sm font-medium">Company Logo</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Aletheia */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-6 text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600">
              <p>
                Aletheia, derived from the ancient Greek word for "truth" and "disclosure," represents our unwavering
                commitment to authentic, transparent education and innovation.
              </p>
              <p>
                We are a collective of creative adults whom the "child" in each of us survived—storytellers, innovators,
                engineers, designers, and strategists united by a common purpose.
              </p>
              <p>
                Our mission transcends traditional boundaries, building brands and bridging communities through
                world-class artistry and technologies, always with real students and real impact at the center of every
                decision.
              </p>
            </div>
          </div>
        </section>

        {/* Sign Logo - Moved Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-48 h-24 bg-neutral-200 rounded-lg flex items-center justify-center">
                <span className="text-neutral-500 text-sm font-medium">Sign Logo</span>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Animated Collaborators Carousel */}
        <CollaboratorsCarousel />

        {/* Our Approach */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center space-y-12">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight leading-tight text-neutral-900">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Authentic Innovation</h3>
                <p className="text-base leading-relaxed tracking-wide text-neutral-600">
                  We solve business problems by tailoring solutions based on a mix of strategy, content, and unique
                  proposition. No communications white noise. No BS.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Relentless Pursuit</h3>
                <p className="text-base leading-relaxed tracking-wide text-neutral-600">
                  Relentlessly pursuing perfection, we are outsiders. By choice. This perspective allows us to see
                  opportunities others miss and create solutions that truly matter.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Community-Centered</h3>
                <p className="text-base leading-relaxed tracking-wide text-neutral-600">
                  Every initiative we undertake is designed with real students, real educators, and real communities at
                  its heart. Impact isn't just measured—it's lived.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Collaborative Spirit</h3>
                <p className="text-base leading-relaxed tracking-wide text-neutral-600">
                  Through partnerships with leading institutions and organizations, we amplify our reach and deepen our
                  impact, creating sustainable change that lasts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-2xl mx-auto px-6 py-16 pb-32 text-center">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight leading-tight text-neutral-900">
              Ready to Create Impact Together?
            </h2>
            <p className="text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
              Join us in building a future where education is accessible, authentic, and transformative for all.
            </p>
            <Link
              href="/contact"
              className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg"
            >
              Start the Conversation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-neutral-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm font-normal tracking-wide text-neutral-600">© 2024 Aletheia</div>
            <div className="flex space-x-8 text-sm font-normal tracking-wide text-neutral-600">
              <Link
                href="/stem-for-all"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                Stem for All
              </Link>
              <Link
                href="/tech-for-good"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                Tech4All
              </Link>
              <Link
                href="/about"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
