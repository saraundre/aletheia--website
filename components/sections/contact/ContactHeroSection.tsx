"use client"

import { useState, useEffect } from "react"

const ContactHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`space-y-6 ${isVisible ? "animate-fade-up" : ""}`}>
          <div className="inline-flex items-center px-4 py-2 bg-slate-100/80 backdrop-blur-sm rounded-full border border-slate-200/50">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-slate-700 text-sm">Get In Touch</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[0.9] tracking-tight">
            Let&apos;s Talk —
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-600 leading-tight">
            No Middlemen
          </h2>
        </div>

        <div className={`mt-8 sm:mt-12 ${isVisible ? "animate-fade-up-delay-1" : ""}`}>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto" style={{fontWeight: 350}}>
            Interested in piloting Spark.OS? Want to support ethical tech development? Let&apos;s connect and build
            something that <span className="text-slate-900 font-medium">matters</span>.
          </p>
        </div>

        <div className={`mt-12 sm:mt-16 ${isVisible ? "animate-fade-up-delay-2" : ""}`}>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  )
}

export default ContactHeroSection
 