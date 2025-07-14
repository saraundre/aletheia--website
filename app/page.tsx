"use client"

import { Home, X, ArrowUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ThreeSlideExperience, type ThreeSlideExperienceRef } from "@/components/three-slide-experience"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [experienceComplete, setExperienceComplete] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const slideExperienceRef = useRef<ThreeSlideExperienceRef>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleExperienceComplete = () => {
    setExperienceComplete(true)
  }

  const scrollToFirstSlide = () => {
    console.log("Back to top clicked") // Debug log
    if (slideExperienceRef.current) {
      slideExperienceRef.current.goToFirstSlide()
    } else {
      console.log("slideExperienceRef.current is null") // Debug log
    }
  }

  // Show back to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Image
              src="/aletheia_logo.png"
              alt="Aletheia Logo"
              width={100}
              height={32}
              className="object-contain"
            />
            <button onClick={toggleMenu} className="hover:opacity-70 transition-opacity" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Home className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-neutral-50/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-8">
              <nav className="space-y-6">
                {[
                  { href: "/stem-for-all", label: "Stem for All" },
                  { href: "/tech4all", label: "Tech4All" },
                  { href: "/about", label: "About" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/contact", label: "Contact" },
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="pb-16 md:pb-8">
        {/* Three Slide Experience */}
        <ThreeSlideExperience ref={slideExperienceRef} onComplete={handleExperienceComplete} />



        {/* Signature Section - Only show after experience complete */}
        {experienceComplete && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="max-w-5xl mx-auto px-6 py-16"
          >
            <div className="text-center space-y-8">
              <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 italic">
                For Sentience,
              </p>
              <div className="flex justify-center">
                <div className="w-48 h-24 flex items-center justify-center">
                  <Image
                    src="/aletheia_signature.svg"
                    alt="Aletheia Signature"
                    width={192}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Footer */}
        {experienceComplete && (
          <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="max-w-5xl mx-auto px-6 py-3"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-xs font-normal tracking-wide text-neutral-600">© 2024 Aletheia</div>
              <div className="flex space-x-2 text-xs font-normal tracking-wide text-neutral-600">
                {[
                  { href: "/stem-for-all", label: "Stem for All" },
                  { href: "/tech4all", label: "Tech4All" },
                  { href: "/about", label: "About" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/contact", label: "Contact" },
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 + index * 0.1 }}
                    className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 text-xs md:text-sm"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.footer>
        )}
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center space-y-2"
        >
          <motion.button
            onClick={scrollToFirstSlide}
            className="bg-neutral-900 text-white p-3 rounded-full shadow-lg hover:bg-neutral-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to first slide"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
            Back to Top
          </span>
        </motion.div>
      )}
    </div>
  )
}
