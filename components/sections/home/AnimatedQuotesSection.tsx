"use client"

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AnimatedQuotesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Check if section is in view
      if (containerRect.top < viewportHeight * 0.8 && containerRect.bottom > viewportHeight * 0.2) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className="h-[200vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative snap-start overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Elegant background elements */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 border border-neutral-200 rounded-full opacity-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: isVisible ? 0.5 : 0, duration: 2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-neutral-200 rounded-full opacity-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 0.08 } : { scale: 0, opacity: 0 }}
            transition={{ delay: isVisible ? 1 : 0, duration: 2, ease: "easeOut" }}
          />
        </motion.div>
        
        <motion.div className="relative z-10 text-center">
          {/* Main Title with elegant reveal */}
          <motion.h2
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-light tracking-wide text-neutral-900 mb-24"
            initial={{ opacity: 0, y: 60 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            The Reason of Being
          </motion.h2>
          
          {/* Opening Statement with sophisticated fade */}
          <motion.p
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-600 text-center leading-relaxed mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ delay: isVisible ? 1.2 : 0, duration: 1.2, ease: "easeOut" }}
          >
            We are a collective of creative adults whom the 'child' in each of us survived.
          </motion.p>
          
          {/* Identity with refined staggered reveal */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: isVisible ? 2.0 : 0, duration: 0.8, ease: "easeOut" }}
          >
            {"Storytellers. Innovators. Engineers. Designers. Strategists.".split('. ').map((role: string, roleIndex: number) => (
              <motion.span
                key={roleIndex}
                className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-600 mx-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  delay: isVisible ? 2.0 + roleIndex * 0.2 : 0,
                  duration: 0.8,
                  ease: "easeOut"
                }}
              >
                {role}{roleIndex < "Storytellers. Innovators. Engineers. Designers. Strategists.".split('. ').length - 1 ? '.' : ''}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Mission with elegant slide */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-neutral-600 text-center leading-relaxed mb-12"
            initial={{ opacity: 0, x: -80 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ delay: isVisible ? 3.2 : 0, duration: 1, ease: "easeOut" }}
          >
            Building brands and bridging communities through world-class artistry and technologies.
          </motion.p>
          
          {/* Approach with sophisticated fade */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-neutral-600 text-center leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: isVisible ? 3.8 : 0, duration: 1, ease: "easeOut" }}
          >
            We solve business problems by tailoring solutions based on a mix of strategy, content and unique proposition.
          </motion.p>
          
          {/* Divider with elegant expansion */}
          <motion.div
            className="w-40 h-px bg-gradient-to-r from-transparent via-neutral-400 to-transparent mx-auto mb-12"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ delay: isVisible ? 4.4 : 0, duration: 1, ease: "easeOut" }}
          />
          
          {/* Promise with refined emphasis */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-700 text-center leading-relaxed mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: isVisible ? 4.8 : 0, duration: 1, ease: "easeOut" }}
          >
            No communications white noise and BS.
          </motion.p>
          
          {/* Ethos with elegant fade */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-neutral-600 text-center leading-relaxed italic"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: isVisible ? 5.2 : 0, duration: 1.2, ease: "easeOut" }}
          >
            Relentlessly pursuing perfection, we are outsiders. By choice.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
} 