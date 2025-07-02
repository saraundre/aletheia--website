"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState, useRef, useCallback } from "react"

const AletheiaHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [breathingPhase, setBreathingPhase] = useState(0)
  const [currentText, setCurrentText] = useState(0)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 15, damping: 50 })
  const springY = useSpring(mouseY, { stiffness: 15, damping: 50 })

  // Subtle liquid transformations
  const liquidX = useTransform(springX, [0, 1], [-30, 30])
  const liquidY = useTransform(springY, [0, 1], [-20, 20])

  // Real-world impact statements
  const textArray = [
    "AI RESEARCH. REAL IMPACT.",
    "SOLUTIONS THAT SCALE WITH YOU.",
    "INNOVATION YOU CAN TRUST.",
    "AI INSIGHT. HUMAN OUTCOME.",
    "RESEARCH, REAL-WORLD POWER.",
    "SCIENCE MEETS SOLUTION.",
    "FUTURE-BUILT, TODAY."
  ];

  // Optimized breathing animation with useCallback to prevent Fast Refresh issues
  const updateBreathing = useCallback(() => {
    setBreathingPhase((prev) => prev + 0.02)
  }, [])

  const updateText = useCallback(() => {
    setCurrentText((prev) => (prev + 1) % textArray.length)
  }, [textArray.length])

  // Continuous breathing and text changing - OPTIMIZED for Fast Refresh and Performance
  useEffect(() => {
    const textInterval = setInterval(updateText, 8000)
    const breathingInterval = setInterval(updateBreathing, 1200)

    return () => {
      clearInterval(textInterval)
      clearInterval(breathingInterval)
    }
  }, [updateText, updateBreathing])

  // Mouse tracking - THROTTLED for performance
  useEffect(() => {
    let ticking = false
    let isPageVisible = true
    
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking && isPageVisible) {
        requestAnimationFrame(() => {
          if (containerRef.current && isPageVisible) {
            const rect = containerRef.current.getBoundingClientRect()
            mouseX.set((e.clientX - rect.left) / rect.width)
            mouseY.set((e.clientY - rect.top) / rect.height)
          }
          ticking = false
        })
        ticking = true
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      data-hero-section
      className="relative min-h-screen bg-white text-gray-800 overflow-hidden flex items-center justify-center"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        {/* Static elegant shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-[0.03]"
          style={{
            x: liquidX,
            y: liquidY,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-800/10 to-transparent rounded-full blur-2xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-[0.02]"
          style={{
            x: useTransform(liquidX, (x) => -x * 0.5),
            y: useTransform(liquidY, (y) => -y * 0.5),
          }}
        >
          <div className="w-full h-full bg-gradient-to-tl from-gray-600/10 to-transparent rounded-full blur-2xl" />
        </motion.div>
      </div>

      {/* Subtle floating elements */}
      <motion.div
        className="absolute w-1 h-16 bg-gradient-to-b from-gray-400/20 to-transparent rounded-full"
        style={{
          left: "25%",
          top: "35%",
          opacity: 0.3 + Math.sin(breathingPhase) * 0.1,
        }}
        animate={{
          y: Math.sin(breathingPhase * 0.7) * 10,
        }}
      />

      <motion.div
        className="absolute w-16 h-1 bg-gradient-to-r from-gray-400/20 to-transparent rounded-full"
        style={{
          right: "25%",
          bottom: "35%",
          opacity: 0.3 + Math.cos(breathingPhase) * 0.1,
        }}
        animate={{
          x: Math.cos(breathingPhase * 0.8) * 10,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* ALETHEIA - Living Typography - OPTIMIZED */}
        <motion.div className="mb-20">
          <div className="flex justify-center items-center">
            {"ALETHEIA".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-thin cursor-pointer"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 100,
                  letterSpacing: "0.12em",
                  backgroundImage: `linear-gradient(135deg, 
                    #111827 0%, 
                    #1f2937 25%,
                    #374151 50%, 
                    #4b5563 75%,
                    #111827 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: `drop-shadow(0 0 20px rgba(17, 24, 39, 0.15))`,
                }}
                animate={{
                  y: Math.sin(breathingPhase + index * 0.3) * 4,
                  scale: 1 + Math.sin(breathingPhase + index * 0.2) * 0.02,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  filter: `drop-shadow(0 10px 20px rgba(17, 24, 39, 0.3))`,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                transition={{
                  duration: 0.2,
                  ease: "linear",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Real-world impact statements */}
        <motion.div
          animate={{
            opacity: 0.8 + Math.sin(breathingPhase * 0.5) * 0.2,
            y: Math.sin(breathingPhase * 0.3) * 3,
          }}
        >
          <motion.p
            key={currentText}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-widest"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 200,
              backgroundImage: `linear-gradient(90deg, 
                rgba(17,24,39,0.9) 0%, 
                rgba(31,41,55,0.7) 50%, 
                rgba(17,24,39,0.9) 100%)`,
              backgroundSize: "200% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{
              opacity: 0,
              y: 30,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            exit={{
              opacity: 0,
              y: -30,
              filter: "blur(10px)",
            }}
            transition={{
              opacity: { duration: 0.8 },
              y: { duration: 0.8 },
              filter: { duration: 0.8 },
              backgroundPosition: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            {textArray[currentText]}
          </motion.p>
        </motion.div>

        {/* Subtle impact indicator */}
        <motion.div
          className="mt-16"
          animate={{
            opacity: 0.4 + Math.sin(breathingPhase * 0.4) * 0.2,
          }}
        >
          <motion.div
            className="inline-flex items-center space-x-2"
            animate={{
              scale: 1 + Math.sin(breathingPhase * 0.3) * 0.02,
            }}
          >
            <motion.div
              className="w-1 h-1 bg-gray-800 rounded-full"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span
              className="text-gray-700 text-xs font-light tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Real Impact
            </span>
            <motion.div
              className="w-1 h-1 bg-gray-700 rounded-full"
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: Math.sin(breathingPhase * 0.6) * 3,
        }}
      >
        <motion.div
          className="w-1 h-8 bg-gradient-to-b from-gray-300/40 to-transparent rounded-full"
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  )
}

export default AletheiaHeroSection
