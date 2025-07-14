"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

// ============================================================================
// TYPEWRITER COMPONENT
// ============================================================================

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
}

export function Typewriter({ text, speed = 100, className = "" }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// ============================================================================
// THREE SLIDE EXPERIENCE COMPONENT
// ============================================================================

export interface ThreeSlideExperienceProps {
  onComplete?: () => void
}

export interface ThreeSlideExperienceRef {
  goToFirstSlide: () => void
}

export const ThreeSlideExperience = forwardRef<ThreeSlideExperienceRef, ThreeSlideExperienceProps>(
  ({ onComplete }, ref) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [visibleRoles, setVisibleRoles] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [showContinueScrolling, setShowContinueScrolling] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const lastScrollTime = useRef(0)

    // Touch event state
    const touchStartY = useRef<number | null>(null)
    const touchEndY = useRef<number | null>(null)

    const roles = ["Storytellers.", "Innovators.", "Engineers.", "Designers.", "Strategists."]

    // Expose method to parent component
    useImperativeHandle(ref, () => ({
      goToFirstSlide: () => {
        // Immediately prepare the slide experience
        setCurrentSlide(0)
        setVisibleRoles(0)
        setShowContinueScrolling(false)
        setIsActive(true)
        document.body.style.overflow = "hidden"
        
        // Then smoothly scroll to the container
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center", // Center instead of start to avoid sticky section issues
            })
          }
        }, 50) // Much shorter delay
      },
    }))

    useEffect(() => {
      const handleScroll = (e: WheelEvent) => {
        if (!isActive) return

        e.preventDefault()
        e.stopPropagation()

        const now = Date.now()
        const direction = e.deltaY > 0 ? 1 : -1
        
        // Much shorter delay for backward scrolling to make it more responsive
        const scrollDelay = direction < 0 ? 100 : 800
        if (now - lastScrollTime.current < scrollDelay) return
        lastScrollTime.current = now

        if (currentSlide === 0) {
          // First slide - move to roles slide
          if (direction > 0) {
            setCurrentSlide(1)
          }
        } else if (currentSlide === 1) {
          // Roles slide - handle progressive role reveal
          if (direction > 0 && visibleRoles < roles.length) {
            setVisibleRoles((prev) => prev + 1)
          } else if (direction < 0 && showContinueScrolling) {
            // If we're in "continue scrolling" state, go back to showing roles
            setVisibleRoles(roles.length) // Ensure all roles are visible first
            setShowContinueScrolling(false)
          } else if (direction < 0 && visibleRoles > 0) {
            setVisibleRoles((prev) => prev - 1)
          } else if (direction > 0 && visibleRoles === roles.length) {
            // All roles visible, move to mission statements
            setCurrentSlide(2)
          } else if (direction < 0 && visibleRoles === 0) {
            // Go back to first slide
            setCurrentSlide(0)
          }
        } else if (currentSlide === 2) {
          // Mission statements slide
          if (direction < 0) {
            setCurrentSlide(1)
            setVisibleRoles(roles.length) // Make sure all roles are visible
            // Small delay to ensure state consistency
            setTimeout(() => {
              setShowContinueScrolling(true)
            }, 50)
          } else if (direction > 0) {
            // Complete the experience with smooth transition
            setIsActive(false)
            // Immediately remove event listeners to prevent conflicts
            window.removeEventListener("wheel", handleScroll)
            window.removeEventListener("keydown", handleKeyDown)
            // Small delay to ensure smooth transition to normal scrolling
            setTimeout(() => {
              document.body.style.overflow = "unset"
              // Ensure we're positioned at the end of the experience for seamless continuation
              if (containerRef.current) {
                const containerBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight
                // Only adjust scroll position if we're not already past the container
                if (window.scrollY < containerBottom) {
                  window.scrollTo({
                    top: containerBottom - window.innerHeight / 4, // Leave some buffer
                    behavior: "auto" // Instant positioning to avoid conflicts
                  })
                }
              }
              onComplete?.()
            }, 100)
          }
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isActive) return

        if (e.key === "ArrowDown" || e.key === " ") {
          e.preventDefault()
          if (currentSlide === 0) {
            setCurrentSlide(1)
          } else if (currentSlide === 1) {
            if (visibleRoles < roles.length) {
              setVisibleRoles((prev) => prev + 1)
            } else {
              setCurrentSlide(2)
            }
          } else if (currentSlide === 2) {
            setIsActive(false)
            document.body.style.overflow = "unset"
            onComplete?.()
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          if (currentSlide === 2) {
            setCurrentSlide(1)
            setVisibleRoles(roles.length)
            setTimeout(() => {
              setShowContinueScrolling(true)
            }, 50)
          } else if (currentSlide === 1) {
            if (showContinueScrolling) {
              setVisibleRoles(roles.length)
              setShowContinueScrolling(false)
            } else if (visibleRoles > 0) {
              setVisibleRoles((prev) => prev - 1)
            } else {
              setCurrentSlide(0)
            }
          }
        }
      }

      // --- Touch event handlers ---
      const handleTouchStart = (e: TouchEvent) => {
        if (!isActive) return
        touchStartY.current = e.touches[0].clientY
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (!isActive) return
        touchEndY.current = e.touches[0].clientY
      }

      const handleTouchEnd = () => {
        if (!isActive || touchStartY.current === null || touchEndY.current === null) return
        const deltaY = touchStartY.current - touchEndY.current
        // Threshold for swipe
        if (Math.abs(deltaY) > 40) {
          if (deltaY > 0) {
            // Swipe up (next slide)
            handleScroll({ deltaY: 100, preventDefault: () => {}, stopPropagation: () => {} } as WheelEvent)
          } else {
            // Swipe down (previous slide)
            handleScroll({ deltaY: -100, preventDefault: () => {}, stopPropagation: () => {} } as WheelEvent)
          }
        }
        touchStartY.current = null
        touchEndY.current = null
      }

      if (isActive) {
        document.body.style.overflow = "hidden"
        window.addEventListener("wheel", handleScroll, { passive: false })
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("touchstart", handleTouchStart, { passive: false })
        window.addEventListener("touchmove", handleTouchMove, { passive: false })
        window.addEventListener("touchend", handleTouchEnd, { passive: false })
      }

      return () => {
        document.body.style.overflow = "unset"
        window.removeEventListener("wheel", handleScroll)
        window.removeEventListener("keydown", handleKeyDown)
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
        window.removeEventListener("touchend", handleTouchEnd)
      }
    }, [isActive, currentSlide, visibleRoles, roles.length, onComplete])

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isActive) {
            setIsActive(true)
          }
        },
        { threshold: 0.7 },
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => observer.disconnect()
    }, [isActive])

    // Reset roles when going back to slide 1
    useEffect(() => {
      if (currentSlide === 1 && visibleRoles === 0) {
        // Don't reset if we're coming from slide 2
      } else if (currentSlide !== 1) {
        // Reset roles when leaving slide 1
        if (currentSlide === 0) {
          setVisibleRoles(0)
        }
      }
    }, [currentSlide])

    // Show "Continue scrolling" after all roles are visible with a delay
    useEffect(() => {
      // Only auto-trigger continue scrolling when moving forward through roles
      if (currentSlide === 1 && visibleRoles === roles.length && !showContinueScrolling) {
        // Add a flag to distinguish between auto-trigger and manual backward navigation
        const timer = setTimeout(() => {
          setShowContinueScrolling(true)
        }, 1500) // 1.5 second delay after "Strategists." appears
        
        return () => clearTimeout(timer)
      } else if (currentSlide !== 1) {
        // Only reset when leaving slide 1, not when roles change
        setShowContinueScrolling(false)
      }
    }, [currentSlide, visibleRoles, roles.length, showContinueScrolling])

    const renderSlideContent = () => {
      switch (currentSlide) {
        case 0:
          return (
            <motion.div
              key="slide-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center space-y-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-tight">
                <Typewriter text="Our Reason of Being" speed={150} />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-3xl mx-auto"
              >
                We are a collective of creative adults whom the {"'child'"} in each of us survived.
              </motion.p>
            </motion.div>
          )

        case 1:
          return (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center space-y-8"
            >
              {roles.map((role, index) => (
                <motion.div
                  key={role}
                  initial={{
                    opacity: 0,
                    y: 80,
                    scale: 0.8,
                  }}
                  animate={
                    index < visibleRoles
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                      : {
                          opacity: 0,
                          y: 80,
                          scale: 0.8,
                        }
                  }
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: index < visibleRoles ? (index - Math.max(0, visibleRoles - 5)) * 0.2 : 0,
                  }}
                  className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                >
                  {role}
                </motion.div>
              ))}
            </motion.div>
          )

        case 2:
          return (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center space-y-16 pt-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-wide"
              >
                Building brands and bridging communities<br />through world-class artistry and technologies.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-wide"
              >
                We solve business problems by tailoring solutions<br />based on a mix of strategy, content and unique
                proposition.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className=""
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-wide">
                  No communications white noise.
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-wide">No BS.</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-wide pb-16"
              >
                Relentlessly pursuing perfection, we are outsiders.<br />By choice.
              </motion.div>
            </motion.div>
          )

        default:
          return null
      }
    }

    return (
      <div ref={containerRef} className="relative">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,182,193,0.1),transparent_50%)]" />
        </div>

        {/* Main Content */}
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="px-6 w-full">
            <AnimatePresence mode="wait">{renderSlideContent()}</AnimatePresence>
          </div>

          {/* Right Side Progress Ticks */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30"
            >
              <div className="flex flex-col space-y-4">
                {[0, 1, 2].map((slideIndex) => (
                  <motion.div
                    key={slideIndex}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      slideIndex === currentSlide
                        ? "bg-neutral-900 shadow-lg scale-125"
                        : slideIndex < currentSlide
                          ? "bg-neutral-400"
                          : "bg-neutral-200"
                    }`}
                    animate={{
                      scale: slideIndex === currentSlide ? 1.25 : 1,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Bottom Scroll Prompts - Fixed to bottom but centered to content */}
          <div className="fixed bottom-8 left-0 right-0 px-6 z-30">
            {/* Scroll to Explore Hint */}
            {isActive && currentSlide === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 }}
                className="text-center"
              >
                <div className="flex flex-col items-center space-y-3 text-neutral-500">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-xs uppercase tracking-wider font-medium"
                  >
                    Scroll to Explore
                  </motion.div>
                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="flex items-center justify-center"
                  >
                    <ChevronDown className="w-6 h-6 text-neutral-400" />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Roles Progress Indicator */}
            {isActive && currentSlide === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="flex flex-col items-center space-y-3 text-neutral-500">
                  <AnimatePresence mode="wait">
                    {!showContinueScrolling ? (
                      <motion.div
                        key="scroll-to-reveal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs uppercase tracking-wider"
                      >
                        Scroll to reveal
                      </motion.div>
                    ) : (
                      <motion.div
                        key="continue-scrolling"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col items-center space-y-3"
                      >
                        <motion.div
                          animate={{ y: [0, 8, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="text-xs uppercase tracking-wider"
                        >
                          Continue scrolling
                        </motion.div>
                        <motion.div
                          animate={{
                            y: [0, 8, 0],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="flex items-center justify-center"
                        >
                          <ChevronDown className="w-6 h-6 text-neutral-400" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <AnimatePresence>
                    {!showContinueScrolling && (
                      <motion.div
                        key="role-dots"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="flex space-x-2"
                      >
                        {roles.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index < visibleRoles ? "bg-neutral-600" : "bg-neutral-300"
                            }`}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    )
  },
)

ThreeSlideExperience.displayName = "ThreeSlideExperience" 