"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function AnimatedQuotesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = "The Reason of Being"
  const [titlePhase, setTitlePhase] = useState<"hidden" | "appearing" | "visible" | "disappearing" | "disappeared">(
    "hidden",
  )

  // Simple animation state
  const [visibleSentences, setVisibleSentences] = useState(0)

  const contentTexts = [
    "We are a collective of creative adults whom the 'child' in each of us survived.",
    "Storytellers. Innovators. Engineers. Designers. Strategists.",
    "Building brands and bridging communities through world-class artistry and technologies.",
    "We solve business problems by tailoring solutions based on a mix of strategy, content and unique proposition.",
    "No communications white noise and BS.",
    "Relentlessly pursuing perfection, we are outsiders. By choice.",
  ]

  const changingWords = ["Storytellers.", "Innovators.", "Engineers.", "Designers.", "Strategists."]

  // Mouse tracking for elegant interactions
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 12, damping: 60 })
  const springY = useSpring(mouseY, { stiffness: 12, damping: 60 })

  // Subtle liquid transformations
  const liquidX = useTransform(springX, [0, 1], [-15, 15])
  const liquidY = useTransform(springY, [0, 1], [-10, 10])

  // Breathing animation
  const updateBreathing = useCallback(() => {
    if (document.visibilityState === 'visible') {
      setBreathingPhase((prev) => prev + 0.012)
    }
  }, [])

  useEffect(() => {
    const breathingInterval = setInterval(updateBreathing, 120)
    return () => clearInterval(breathingInterval)
  }, [updateBreathing])

  // Mouse tracking
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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      if (containerRect.top < viewportHeight * 0.8 && containerRect.bottom > viewportHeight * 0.2) {
        setIsVisible(true)
        
        // No scroll progress needed - keeping it natural
      } else {
        setIsVisible(false)
      }
    }

    const handleVisibilityChange = () => {
      console.log("👁️ Visibility changed:", document.visibilityState)
      if (document.visibilityState === 'visible') {
        // Force a re-render when tab becomes visible
        setTimeout(() => {
          handleScroll()
        }, 100)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // Title phase management
  useEffect(() => {
    if (!isVisible) {
      return
    }

    if (titlePhase === "hidden") {
      setTitlePhase("appearing")
    }
  }, [isVisible, titlePhase])

  // Typing animation effect for title
  useEffect(() => {
    if (titlePhase === "appearing" && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)

        if (currentIndex + 1 >= fullText.length) {
          setIsTypingComplete(true)
          setTitlePhase("visible")
        }
      }, 120)

      return () => clearTimeout(timeout)
    }
  }, [titlePhase, currentIndex, fullText])

  // Handle title disappearance after being visible
  useEffect(() => {
    if (titlePhase === "visible") {
      const timeout = setTimeout(() => {
        setTitlePhase("disappearing")
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [titlePhase])

  // Complete disappearance
  useEffect(() => {
    if (titlePhase === "disappearing") {
      const timeout = setTimeout(() => {
        setTitlePhase("disappeared")
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [titlePhase])

  // Simple animation - show sentences one by one
  useEffect(() => {
    if (titlePhase === "disappeared" && isVisible && visibleSentences < contentTexts.length) {
      const timer = setTimeout(() => {
        setVisibleSentences(prev => prev + 1)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [titlePhase, visibleSentences, contentTexts.length, isVisible])

  // Scroll locking effect


  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 relative snap-start overflow-hidden bg-white"
    >
      {/* Subtle Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-[0.015]"
          animate={{
            opacity: 0.015 + Math.sin(breathingPhase * 0.2) * 0.005,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(17,24,39,0.15) 1px, transparent 0),
                linear-gradient(45deg, transparent 40%, rgba(17,24,39,0.02) 50%, transparent 60%)
              `,
              backgroundSize: "20px 20px, 40px 40px",
            }}
          />
        </motion.div>
      </div>

      {/* Letter Container */}
      <div className="relative max-w-4xl mx-auto w-full">
        <motion.div
          className="relative z-10 p-12 sm:p-16 lg:p-20"
          animate={{
            y: Math.sin(breathingPhase * 0.08) * 1,
          }}
        >
          {/* Letter Title */}
          <motion.div
            className="relative z-20 mb-6 text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={
              titlePhase === "appearing" || titlePhase === "visible"
                ? {
                    opacity: 1,
                    y: Math.sin(breathingPhase * 0.12) * 1,
                  }
                : titlePhase === "disappearing"
                  ? {
                      opacity: 0,
                      y: -30,
                    }
                  : { opacity: 0, y: 30 }
            }
            transition={{
              duration: titlePhase === "disappearing" ? 1.5 : 2.8,
              ease: "easeInOut",
              delay: titlePhase === "appearing" ? 0.5 : 0,
            }}
          >
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.15em] mb-4 text-center font-serif text-gray-900 whitespace-nowrap">
              <div className="flex justify-center items-center flex-nowrap">
                {typedText.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    animate={{
                      y: Math.sin(breathingPhase + index * 0.2) * 2,
                      scale: 1 + Math.sin(breathingPhase + index * 0.15) * 0.01,
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -4,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    transition={{
                      duration: 0.1,
                      ease: "linear",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
                {isVisible && currentIndex < fullText.length && (
                  <motion.span
                    className="inline-block w-0.5 bg-gray-700 ml-2"
                    animate={{
                      opacity: [1, 0.2, 1],
                      scaleY: 1 + Math.sin(breathingPhase * 0.4) * 0.1,
                    }}
                    transition={{
                      opacity: { duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      scaleY: { duration: 0.1, ease: "linear" },
                    }}
                    style={{
                      height: "0.8em",
                      verticalAlign: "text-top",
                    }}
                  />
                )}
              </div>
            </motion.h1>
          </motion.div>

          {/* Letter Content */}
          <motion.div
            className="space-y-8 -mt-8 relative"
            initial={{ opacity: 0 }}
            animate={titlePhase === "disappeared" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
          >
            {/* Opening quotation mark */}
            <motion.div
              className="absolute -top-8 -left-4 text-6xl text-gray-300 font-serif"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={titlePhase === "disappeared" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 2, ease: "easeOut" }}
            >
              "
            </motion.div>

            {/* Render all sentences with proper styling */}
            {contentTexts.map((text, index) => {
              // Different styling for different sentences
              const getTextStyle = (index: number) => {
                switch (index) {
                  case 0:
                    return {
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.8,
                      textIndent: "2em",
                      color: "#374151",
                    }
                  case 1:
                    return {
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.8,
                      color: "#374151",
                    }
                  case 4:
                    return {
                      fontFamily: "'Playfair Display', 'Times New Roman', serif",
                      fontWeight: 300,
                      lineHeight: 1.8,
                      textIndent: "2em",
                      color: "#374151",
                      fontStyle: "italic",
                    }
                  default:
                    return {
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.8,
                      textIndent: "2em",
                      color: "#374151",
                    }
                }
              }

              return (
                <motion.div
                  key={index}
                  className={`text-lg sm:text-xl md:text-2xl font-light leading-relaxed ${
                    index === 4 ? "italic" : ""
                  } ${index === 0 ? "mt-12" : ""} ${index === 2 ? "mt-8" : ""} ${index === 3 ? "mt-6" : ""} ${index === 4 ? "mt-6" : ""} ${index === 5 ? "mt-4" : ""}`}
                  style={getTextStyle(index)}
                  initial={{ opacity: 0 }}
                  animate={index < visibleSentences && titlePhase === "disappeared" ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {text}
                </motion.div>
              )
            })}

            {/* Closing quotation mark */}
            <motion.div
              className="absolute -bottom-4 -right-4 text-6xl text-gray-300 font-serif"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={visibleSentences >= contentTexts.length ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 1, duration: 2, ease: "easeOut" }}
            >
              "
            </motion.div>
          </motion.div>

          {/* Letter Signature */}
          <motion.div
            className="mt-8 flex justify-between items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={
              visibleSentences >= contentTexts.length
                ? {
                    opacity: 1,
                    y: Math.sin(breathingPhase * 0.07) * 0.5,
                  }
                : { opacity: 0, y: 20 }
            }
            transition={{ delay: 2, duration: 2, ease: "easeOut" }}
          >
            <div className="flex-1"></div>
            <motion.div
              className="w-16 h-16 border border-gray-300/50 rounded-full bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center"
              animate={{
                scale: 1 + Math.sin(breathingPhase * 0.25) * 0.015,
                rotate: Math.sin(breathingPhase * 0.08) * 1,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 3,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="w-6 h-6 border border-gray-400/30 rounded-full bg-gray-200/30" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
