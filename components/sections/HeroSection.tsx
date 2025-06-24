"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="hero-minimal gradient-overlay min-h-screen flex items-center justify-center">
      <div className="hero-content w-full flex flex-col items-center justify-center">
        <div className={`${isVisible ? "animate-fade-up" : ""}`}>
          <h1 className="heading-xl mb-8">Aletheia</h1>
        </div>
        <div className={`${isVisible ? "animate-fade-up-delay-1" : ""}`}>
          <p className="body-lg text-slate-600 mb-12 max-w-3xl mx-auto text-center">
            Building ethical, sentient-first technology for a better world.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/stem-for-all">
            <span className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
              Explore STEM for All <ArrowRight size={20} />
            </span>
          </Link>
          <Link href="/contact">
            <span className="btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
              Contact Us <Play size={20} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
 