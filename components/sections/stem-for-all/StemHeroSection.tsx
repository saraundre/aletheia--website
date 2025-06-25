"use client"

import { useState, useEffect } from "react"

function StemForAllHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="hero-minimal gradient-overlay">
      <div className="hero-content">
        <div className={`${isVisible ? "animate-fade-up" : ""}`}>
          <h1 className="heading-xl mb-2 font-extrabold tracking-tight">STEM for All</h1>
          <h2 className="heading-xxl text-slate-500 font-light mb-8">
            <span className="block">Equitable Learning</span>
            <span className="block">Opportunities</span>
          </h2>
        </div>

        <div className={`${isVisible ? "animate-fade-up-delay-1" : ""}`}>
          <p className="body-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            Creating accessible, inclusive learning experiences that reach every student, regardless of background or
            ability.
          </p>
        </div>

        <div className="w-24 h-px bg-slate-300 mx-auto"></div>
      </div>
    </section>
  )
}

export default StemForAllHero;
