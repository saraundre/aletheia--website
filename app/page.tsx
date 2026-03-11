"use client"

import { ArrowUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { ThreeSlideExperience, type ThreeSlideExperienceRef } from "@/components/three-slide-experience"

export default function Component() {
  const [experienceComplete, setExperienceComplete] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const slideExperienceRef = useRef<ThreeSlideExperienceRef>(null)

  const handleExperienceComplete = () => {
    setExperienceComplete(true)
  }

  const scrollToFirstSlide = () => {
    if (slideExperienceRef.current) {
      slideExperienceRef.current.goToFirstSlide()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif">
      <Nav />

      <main>
        <ThreeSlideExperience ref={slideExperienceRef} onComplete={handleExperienceComplete} />

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

        {experienceComplete && (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="border-t border-neutral-200"
          >
            <div className="max-w-7xl mx-auto px-6 py-5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-xs font-normal tracking-widest uppercase text-neutral-500">
                  © 2025 Aletheia
                </p>
                <div className="flex flex-wrap justify-center gap-1">
                  {[
                    { href: "/stem-for-all", label: "STEM for All" },
                    { href: "/tech4all", label: "Tech4All" },
                    { href: "/about", label: "About" },
                    { href: "/gallery", label: "Gallery" },
                    { href: "/contact", label: "Contact" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors px-2 py-1 rounded hover:bg-neutral-100"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.footer>
        )}
      </main>

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
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">
            Back to Top
          </span>
        </motion.div>
      )}
    </div>
  )
}
