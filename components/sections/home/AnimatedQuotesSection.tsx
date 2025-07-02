"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"

const AnimatedQuotesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isLocked, setIsLocked] = useState(true)

  const quotes = [
    {
      title: "The Reason of Being",
      content: "We are a collective of creative adults whom the 'child' in each of us survived."
    },
    {
      title: "Our Identity",
      content: "Storytellers. Innovators. Engineers. Designers. Strategists."
    },
    {
      title: "Our Mission",
      content: "Building brands and bridging communities through world-class artistry and technologies."
    },
    {
      title: "Our Approach",
      content: "We solve business problems by tailoring solutions based on a mix of strategy, content and unique proposition."
    },
    {
      title: "Our Promise",
      content: "No communications white noise and BS."
    },
    {
      title: "Our Ethos",
      content: "Relentlessly pursuing perfection, we are outsiders. By choice."
    }
  ]

  // Lock scroll when component mounts
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('quotes-locked')
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('quotes-locked')
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('quotes-locked')
    }
  }, [isLocked])

  // Handle quote progression
  useEffect(() => {
    if (isComplete) return

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => {
        if (prev === quotes.length - 1) {
          setIsComplete(true)
          return prev
        }
        return prev + 1
      })
    }, 3000) // Change quote every 3 seconds

    return () => clearInterval(interval)
  }, [quotes.length, isComplete])

  // Handle completion and scroll to hero
  useEffect(() => {
    if (isComplete) {
      // Wait a bit then unlock scroll and snap to hero
      const timer = setTimeout(() => {
        setIsLocked(false)
        // Smooth scroll to hero section
        const heroSection = document.querySelector('[data-hero-section]')
        if (heroSection) {
          heroSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 2000) // Wait 2 seconds after completion

      return () => clearTimeout(timer)
    }
  }, [isComplete])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  }

  const quoteVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 3,
        ease: "linear"
      }
    }
  }

  return (
    <section
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        isLocked ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-[0.03]"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-neutral-800/10 to-transparent rounded-full blur-2xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-[0.02]"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-tl from-neutral-600/10 to-transparent rounded-full blur-2xl" />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Progress Indicator */}
        <motion.div className="mb-16">
          <div className="flex justify-center space-x-2">
            {quotes.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentQuoteIndex ? 'bg-neutral-900' : 'bg-neutral-300'
                }`}
                animate={{
                  scale: index === currentQuoteIndex ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: 2,
                  repeat: index === currentQuoteIndex ? Infinity : 0
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Quote Display */}
        <div className="relative h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {quotes.map((quote, index) => (
              index === currentQuoteIndex && (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  variants={quoteVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Quote Title */}
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-800 mb-8 tracking-wider"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 200
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {quote.title}
                  </motion.h2>

                  {/* Quote Content */}
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-neutral-600 leading-relaxed max-w-3xl"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 300
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    {quote.content}
                  </motion.p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <motion.div className="mt-16">
          <div className="w-64 h-px bg-neutral-200 mx-auto relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-neutral-900 origin-left"
              variants={progressVariants}
              initial="hidden"
              animate={currentQuoteIndex < quotes.length - 1 ? "visible" : "hidden"}
              key={currentQuoteIndex}
            />
          </div>
        </motion.div>

        {/* Completion Indicator */}
        {isComplete && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 text-neutral-500"
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-sm font-light tracking-wider uppercase">Preparing your experience...</span>
              <motion.div
                className="w-4 h-4 border-r-2 border-b-2 border-neutral-400 transform rotate-45"
                animate={{
                  y: [0, 3, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute w-1 h-16 bg-gradient-to-b from-neutral-400/20 to-transparent rounded-full"
        style={{
          left: "20%",
          top: "30%",
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute w-16 h-1 bg-gradient-to-r from-neutral-400/20 to-transparent rounded-full"
        style={{
          right: "20%",
          bottom: "30%",
        }}
        animate={{
          x: [0, 20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  )
}

export default AnimatedQuotesSection 