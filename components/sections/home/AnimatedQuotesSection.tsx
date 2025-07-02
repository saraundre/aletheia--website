"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function AnimatedQuotesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = "The Reason of Being"

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
    setBreathingPhase((prev) => prev + 0.012)
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
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (isVisible && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 150)

      return () => clearTimeout(timeout)
    }
  }, [isVisible, currentIndex, fullText])

  useEffect(() => {
    if (!isVisible) {
      setTypedText("")
      setCurrentIndex(0)
    }
  }, [isVisible])

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-20 relative snap-start overflow-hidden bg-white"
    >
      {/* Subtle Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle paper texture */}
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

        {/* Floating elegant shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-80 h-80 opacity-[0.02]"
          style={{
            x: liquidX,
            y: liquidY,
          }}
          animate={{
            scale: 1 + Math.sin(breathingPhase * 0.3) * 0.03,
            rotate: Math.sin(breathingPhase * 0.15) * 1.5,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-900/20 to-transparent rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-1/4 w-60 h-60 opacity-[0.015]"
          style={{
            x: useTransform(liquidX, (x) => -x * 0.6),
            y: useTransform(liquidY, (y) => -y * 0.6),
          }}
          animate={{
            scale: 1 + Math.cos(breathingPhase * 0.4) * 0.025,
            rotate: Math.cos(breathingPhase * 0.2) * -2,
          }}
        >
          <div className="w-full h-full bg-gradient-to-tl from-gray-800/15 to-transparent rounded-full blur-2xl" />
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
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    y: Math.sin(breathingPhase * 0.12) * 1,
                  }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-[0.15em] mb-4 text-center"
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                fontWeight: 200,
                letterSpacing: "0.15em",
                background: `linear-gradient(135deg, 
                  #111827 0%, 
                  #1f2937 25%,
                  #374151 50%, 
                  #4b5563 75%,
                  #111827 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(17, 24, 39, 0.1)",
              }}
            >
              <div className="flex justify-center items-center flex-wrap">
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
                    {letter === " " && typedText.slice(0, index + 1).includes("Reason") && !typedText.slice(0, index + 1).includes("Being") && <br />}
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
            </h1>
          </motion.div>

          {/* Letter Content */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 3.5, duration: 2, ease: "easeOut" }}
          >
            {/* Opening Paragraph */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                lineHeight: 1.8,
                textIndent: "2em",
                color: "#374151",
              }}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={
                isVisible
                  ? {
                      opacity: 1,
                      y: Math.sin(breathingPhase * 0.1) * 0.5,
                      filter: "blur(0px)",
                    }
                  : { opacity: 0, y: 30, filter: "blur(8px)" }
              }
              transition={{ delay: 4.5, duration: 2.5, ease: "easeOut" }}
            >
              We are a collective of creative adults whom the 'child' in each of us survived.
            </motion.p>

            {/* Identity Section */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={
                isVisible
                  ? {
                      opacity: 1,
                      y: Math.sin(breathingPhase * 0.11) * 0.5,
                      filter: "blur(0px)",
                    }
                  : { opacity: 0, y: 30, filter: "blur(8px)" }
              }
              transition={{ delay: 6.0, duration: 2.5, ease: "easeOut" }}
            >
              <p
                className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "#374151",
                }}
              >
                We are{" "}
                {["Storytellers", "Innovators", "Engineers", "Designers", "Strategists"].map((word, index) => (
                  <motion.span
                    key={word}
                    className="font-medium tracking-wide"
                    style={{ color: "#1f2937" }}
                    animate={{
                      opacity: 0.95 + Math.sin(breathingPhase * 0.2 + index * 0.3) * 0.05,
                    }}
                  >
                    {word}
                    {index < 4 && ", "}
                    {index === 3 && " and "}
                  </motion.span>
                ))}
                .
              </p>
            </motion.div>

            {/* Mission Paragraphs */}
            {[
              "Building brands and bridging communities through world-class artistry and technologies.",
              "We solve business problems by tailoring solutions based on a mix of strategy, content and unique proposition.",
            ].map((text, index) => (
              <motion.p
                key={index}
                className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  textIndent: "2em",
                  color: "#374151",
                }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={
                  isVisible
                    ? {
                        opacity: 1,
                        y: Math.sin(breathingPhase * 0.09 + index * 0.1) * 0.5,
                        filter: "blur(0px)",
                      }
                    : { opacity: 0, y: 30, filter: "blur(8px)" }
                }
                transition={{ delay: 7.5 + index * 1.2, duration: 2.5, ease: "easeOut" }}
              >
                {text}
              </motion.p>
            ))}

            {/* Promise Section */}
            <motion.div
              className="text-center py-8 border-t border-b border-gray-200/40"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={
                isVisible
                  ? {
                      opacity: 1,
                      scale: 1 + Math.sin(breathingPhase * 0.06) * 0.005,
                      filter: "blur(0px)",
                    }
                  : { opacity: 0, scale: 0.95, filter: "blur(5px)" }
              }
              transition={{ delay: 10.5, duration: 2.5, ease: "easeOut" }}
            >
              <p
                className="text-base sm:text-lg md:text-xl font-medium tracking-wide"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 500,
                  color: "#1f2937",
                  letterSpacing: "0.025em",
                }}
              >
                No communications white noise and BS.
              </p>
            </motion.div>

            {/* Closing Statement */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed italic"
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', serif",
                fontWeight: 300,
                lineHeight: 1.8,
                textIndent: "2em",
                color: "#374151",
                fontStyle: "italic",
              }}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={
                isVisible
                  ? {
                      opacity: 1,
                      y: Math.sin(breathingPhase * 0.08) * 0.5,
                      filter: "blur(0px)",
                    }
                  : { opacity: 0, y: 30, filter: "blur(8px)" }
              }
              transition={{ delay: 12.0, duration: 2.5, ease: "easeOut" }}
            >
              Relentlessly pursuing perfection, we are outsiders. By choice.
            </motion.p>
          </motion.div>

          {/* Letter Signature */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-200/40 flex justify-between items-end"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    y: Math.sin(breathingPhase * 0.07) * 0.5,
                  }
                : { opacity: 0, y: 20 }
            }
            transition={{ delay: 6, duration: 2, ease: "easeOut" }}
          >
            <div className="flex-1">
              <motion.div
                className="w-32 h-px bg-gradient-to-r from-gray-600 via-gray-400 to-transparent mb-4"
                animate={{
                  scaleX: 1 + Math.sin(breathingPhase * 0.2) * 0.03,
                  opacity: 0.8 + Math.sin(breathingPhase * 0.18) * 0.1,
                }}
              />
              <motion.div
                className="text-sm font-light tracking-wide mb-1"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: "#4b5563",
                  fontWeight: 300,
                }}
                animate={{
                  opacity: 0.9 + Math.sin(breathingPhase * 0.16) * 0.1,
                }}
              >
                Aletheia Technologies
              </motion.div>
              <motion.div
                className="text-xs font-light tracking-wide"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: "#6b7280",
                  fontWeight: 300,
                }}
                animate={{
                  opacity: 0.8 + Math.sin(breathingPhase * 0.14) * 0.1,
                }}
              >
                Creative Excellence
              </motion.div>
            </div>
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
