"use client"

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AnimatedQuotesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "The Reason of Being"

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      if (containerRect.top < viewportHeight * 0.8 && containerRect.bottom > viewportHeight * 0.2) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (isVisible && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 120)

      return () => clearTimeout(timeout)
    }
  }, [isVisible, currentIndex, fullText])

  useEffect(() => {
    if (!isVisible) {
      setTypedText('')
      setCurrentIndex(0)
    }
  }, [isVisible])

  return (
    <section
      ref={containerRef}
      className="h-[200vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative snap-start overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50"
    >
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle geometric patterns */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] opacity-[0.02]"
          initial={{ rotate: 0 }}
          animate={isVisible ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        >
          <div className="w-full h-full border border-slate-300 rounded-full" />
          <div className="absolute inset-4 w-full h-full border border-slate-300 rounded-full" />
          <div className="absolute inset-8 w-full h-full border border-slate-300 rounded-full" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] opacity-[0.015]"
          initial={{ rotate: 0 }}
          animate={isVisible ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 80, ease: "linear", repeat: Infinity }}
        >
          <div className="w-full h-full border border-slate-300 rounded-full" />
          <div className="absolute inset-6 w-full h-full border border-slate-300 rounded-full" />
        </motion.div>

        {/* Elegant floating elements */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-px h-32 bg-gradient-to-b from-transparent via-slate-300 to-transparent"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isVisible ? { opacity: 0.3, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
          transition={{ delay: 1, duration: 2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-32 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isVisible ? { opacity: 0.3, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div className="relative z-10 text-center">
          {/* Elegant subtitle */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-slate-500 font-light">
              Philosophy
            </span>
          </motion.div>

          {/* Main Title with premium typography */}
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.15em] text-slate-900 mb-16"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 100,
              letterSpacing: "0.15em",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {typedText}
            <motion.span
              className="inline-block w-0.5 h-full bg-slate-900 ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ 
                height: '1em',
                verticalAlign: 'text-top'
              }}
            />
          </motion.h1>

          {/* Elegant divider */}
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-16"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
          />

          {/* Opening Statement with refined typography */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-700 text-center leading-relaxed mb-12 max-w-4xl mx-auto"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 200,
              lineHeight: 1.6,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
          >
            We are a collective of creative adults whom the 'child' in each of us survived.
          </motion.p>

          {/* Identity with sophisticated spacing */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.0, duration: 1, ease: "easeOut" }}
          >
            <div className="flex flex-wrap justify-center items-center gap-8">
              {["Storytellers", "Innovators", "Engineers", "Designers", "Strategists"].map((role, roleIndex) => (
                <motion.span
                  key={roleIndex}
                  className="text-lg sm:text-xl md:text-2xl font-light text-slate-600"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 200,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    delay: 2.0 + roleIndex * 0.15,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                >
                  {role}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Mission with elegant presentation */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 3.2, duration: 1, ease: "easeOut" }}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl font-light text-slate-700 text-center leading-relaxed max-w-4xl mx-auto"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 200,
              }}
            >
              Building brands and bridging communities through world-class artistry and technologies.
            </p>
          </motion.div>

          {/* Approach with refined typography */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 3.8, duration: 1, ease: "easeOut" }}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl font-light text-slate-700 text-center leading-relaxed max-w-4xl mx-auto"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 200,
              }}
            >
              We solve business problems by tailoring solutions based on a mix of strategy, content and unique proposition.
            </p>
          </motion.div>

          {/* Elegant divider */}
          <motion.div
            className="w-16 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-12"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ delay: 4.4, duration: 1, ease: "easeOut" }}
          />

          {/* Promise with emphasis */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 4.8, duration: 1, ease: "easeOut" }}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 text-center leading-relaxed"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
              }}
            >
              No communications white noise and BS.
            </p>
          </motion.div>

          {/* Ethos with elegant styling */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 5.2, duration: 1.2, ease: "easeOut" }}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl font-light text-slate-700 text-center leading-relaxed italic"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 200,
              }}
            >
              Relentlessly pursuing perfection, we are outsiders. By choice.
            </p>
          </motion.div>

          {/* Final elegant element */}
          <motion.div
            className="w-8 h-8 border border-slate-300 rounded-full mx-auto"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 0.5 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 5.8, duration: 1, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </section>
  )
} 