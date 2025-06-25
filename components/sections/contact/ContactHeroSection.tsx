"use client"

import { useState, useEffect } from "react"

const ContactHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="hero-minimal gradient-overlay">
      <div className="hero-content">
        <div className={`${isVisible ? "animate-fade-up" : ""}`}>
          <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full mb-12">
            <div className="status-dot online mr-2"></div>
            <span className="text-slate-700 text-sm font-medium">Get In Touch</span>
          </div>
        </div>

        <div className={`${isVisible ? "animate-fade-up-delay-1" : ""}`}>
          <h1 className="heading-xl mb-2">Let&apos;s Talk —</h1>
          <h2 className="heading-xxl mb-8 text-slate-500 font-light">No Middlemen</h2>
        </div>

        <div className={`${isVisible ? "animate-fade-up-delay-2" : ""}`}>
          <p className="body-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            Interested in piloting Spark.OS? Want to support ethical tech development? Let&apos;s connect and build
            something that <span className="text-slate-900 font-medium">matters</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContactHeroSection
 