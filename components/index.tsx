"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type React from "react"

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
// REVEAL TEXT COMPONENT
// ============================================================================

interface RevealTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  blur?: boolean
}

export function RevealText({ children, className = "", delay = 0, duration = 0.8, blur = true }: RevealTextProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const words = children.split(" ")

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            y: 50,
            filter: blur ? "blur(10px)" : "blur(0px)",
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
              : {}
          }
          transition={{
            duration,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// ============================================================================
// SLIDE TEXT COMPONENT
// ============================================================================

interface SlideTextProps {
  children: string
  className?: string
  delay?: number
  direction?: "left" | "right" | "up" | "down"
}

export function SlideText({ children, className = "", delay = 0, direction = "up" }: SlideTextProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -100, y: 0 }
      case "right":
        return { x: 100, y: 0 }
      case "up":
        return { x: 0, y: 50 }
      case "down":
        return { x: 0, y: -50 }
      default:
        return { x: 0, y: 50 }
    }
  }

  return (
    <motion.div
      initial={{
        ...getInitialPosition(),
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        scale: { duration: 0.6 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// PROGRESSIVE ROLES COMPONENT
// ============================================================================

interface ProgressiveRolesProps {
  roles: string[]
  onComplete?: () => void
}

export function ProgressiveRoles({ roles, onComplete }: ProgressiveRolesProps) {
  const [visibleRoles, setVisibleRoles] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!isActive) return

      e.preventDefault()
      e.stopPropagation()

      const now = Date.now()
      if (now - lastScrollTime.current < 600) return // Throttle scroll events
      lastScrollTime.current = now

      const direction = e.deltaY > 0 ? 1 : -1

      if (direction > 0 && visibleRoles < roles.length) {
        setVisibleRoles((prev) => prev + 1)
      } else if (direction < 0 && visibleRoles > 0) {
        setVisibleRoles((prev) => prev - 1)
      } else if (direction > 0 && visibleRoles === roles.length) {
        // All roles are visible, signal completion
        setTimeout(() => {
          setIsActive(false)
          onComplete?.()
        }, 1000)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return

      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault()
        if (visibleRoles < roles.length) {
          setVisibleRoles((prev) => prev + 1)
        } else {
          setTimeout(() => {
            setIsActive(false)
            onComplete?.()
          }, 1000)
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (visibleRoles > 0) {
          setVisibleRoles((prev) => prev - 1)
        }
      }
    }

    if (isActive) {
      window.addEventListener("wheel", handleScroll, { passive: false })
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isActive, visibleRoles, roles.length, onComplete])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isActive) {
          setIsActive(true)
        }
      },
      { threshold: 0.7 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isActive])

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,182,193,0.1),transparent_50%)]" />
      </div>

      {/* Roles */}
      <div className="text-center max-w-4xl mx-auto px-6 space-y-8">
        {roles.map((role, index) => (
          <motion.div
            key={role}
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.8,
              filter: "blur(10px)",
            }}
            animate={
              index < visibleRoles
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    y: 100,
                    scale: 0.8,
                    filter: "blur(10px)",
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
      </div>

      {/* Progress indicator */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30"
        >
          <div className="flex flex-col space-y-3">
            {roles.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < visibleRoles ? "bg-neutral-900" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Scroll hint */}
      {isActive && visibleRoles === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30"
        >
          <div className="flex flex-col items-center space-y-3 text-neutral-500">
            <div className="text-xs uppercase tracking-wider">Scroll to reveal</div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-0.5 h-12 bg-neutral-400 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ============================================================================
// CINEMATIC SCROLL COMPONENT
// ============================================================================

interface CinematicScrollProps {
  sections: {
    id: string
    content: React.ReactNode
    background?: string
  }[]
  onComplete?: () => void
}

export function CinematicScroll({ sections, onComplete }: CinematicScrollProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const lastScrollTime = useRef(0)

  const { scrollY } = useScroll()

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])
  const midgroundY = useTransform(scrollY, [0, 1000], [0, -100])
  const foregroundY = useTransform(scrollY, [0, 1000], [0, -50])

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!isScrollLocked) return

      e.preventDefault()
      e.stopPropagation()

      const now = Date.now()
      if (now - lastScrollTime.current < 800) return // Throttle scroll events
      lastScrollTime.current = now

      const direction = e.deltaY > 0 ? 1 : -1

      if (direction > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1)
      } else if (direction < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1)
      } else if (direction > 0 && currentSection === sections.length - 1) {
        // Reached the end, unlock scroll and signal completion
        setIsScrollLocked(false)
        onComplete?.()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isScrollLocked) return

      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault()
        if (currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1)
        } else {
          setIsScrollLocked(false)
          onComplete?.()
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (currentSection > 0) {
          setCurrentSection((prev) => prev - 1)
        }
      }
    }

    if (isScrollLocked) {
      window.addEventListener("wheel", handleScroll, { passive: false })
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isScrollLocked, currentSection, sections.length, onComplete])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isScrollLocked) {
          setIsScrollLocked(true)
        }
      },
      { threshold: 0.7 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isScrollLocked])

  return (
    <div ref={containerRef} className="relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: sections[currentSection]?.background || "linear-gradient(to bottom right, #f9fafb, #e5e7eb)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            {sections[currentSection]?.content}
          </motion.div>
        </AnimatePresence>

        {/* Right Side Progress */}
        {isScrollLocked && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30"
          >
            <div className="flex flex-col space-y-4">
              {sections.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentSection
                      ? "bg-neutral-900 shadow-lg"
                      : index < currentSection
                        ? "bg-neutral-400"
                        : "bg-neutral-200"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    scale: index === currentSection ? 1.1 : 1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Scroll Hint */}
        {isScrollLocked && currentSection === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30"
          >
            <div className="flex flex-col items-center space-y-3 text-neutral-500">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-xs uppercase tracking-wider"
              >
                Scroll to explore
              </motion.div>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-0.5 h-12 bg-neutral-400 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
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
    const containerRef = useRef<HTMLDivElement>(null)
    const lastScrollTime = useRef(0)

    const roles = ["Storytellers.", "Innovators.", "Engineers.", "Designers.", "Strategists."]

    // Expose method to parent component
    useImperativeHandle(ref, () => ({
      goToFirstSlide: () => {
        // First scroll to the container
        if (containerRef.current) {
          containerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }

        // Then reset the slide state after a short delay
        setTimeout(() => {
          setCurrentSlide(0)
          setVisibleRoles(0)
          setIsActive(true)
          document.body.style.overflow = "hidden"
        }, 500)
      },
    }))

    useEffect(() => {
      const handleScroll = (e: WheelEvent) => {
        if (!isActive) return

        e.preventDefault()
        e.stopPropagation()

        const now = Date.now()
        if (now - lastScrollTime.current < 800) return
        lastScrollTime.current = now

        const direction = e.deltaY > 0 ? 1 : -1

        if (currentSlide === 0) {
          // First slide - move to roles slide
          if (direction > 0) {
            setCurrentSlide(1)
          }
        } else if (currentSlide === 1) {
          // Roles slide - handle progressive role reveal
          if (direction > 0 && visibleRoles < roles.length) {
            setVisibleRoles((prev) => prev + 1)
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
          } else if (direction > 0) {
            // Complete the experience
            setIsActive(false)
            document.body.style.overflow = "unset"
            onComplete?.()
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
          } else if (currentSlide === 1) {
            if (visibleRoles > 0) {
              setVisibleRoles((prev) => prev - 1)
            } else {
              setCurrentSlide(0)
            }
          }
        }
      }

      if (isActive) {
        document.body.style.overflow = "hidden"
        window.addEventListener("wheel", handleScroll, { passive: false })
        window.addEventListener("keydown", handleKeyDown)
      }

      return () => {
        document.body.style.overflow = "unset"
        window.removeEventListener("wheel", handleScroll)
        window.removeEventListener("keydown", handleKeyDown)
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
              className="text-center space-y-8 max-w-4xl mx-auto"
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
              className="text-center max-w-4xl mx-auto space-y-16 pt-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-wide"
              >
                Building brands and bridging communities through world-class artistry and technologies.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-wide"
              >
                We solve business problems by tailoring solutions based on a mix of strategy, content and unique
                proposition.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="space-y-8"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-wide">
                  No communications white noise.
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-wide">No BS.</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-wide"
              >
                Relentlessly pursuing perfection, we are outsiders. By choice.
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
        <div className="min-h-screen flex items-center justify-center relative px-6">
          <AnimatePresence mode="wait">{renderSlideContent()}</AnimatePresence>

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

          {/* Scroll to Explore Hint */}
          {isActive && currentSlide === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30"
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
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-0.5 h-12 bg-neutral-400 rounded-full"
                />
              </div>
            </motion.div>
          )}

          {/* Roles Progress Indicator */}
          {isActive && currentSlide === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30"
            >
              <div className="flex flex-col items-center space-y-3 text-neutral-500">
                <div className="text-xs uppercase tracking-wider">
                  {visibleRoles < roles.length ? "Scroll to reveal" : "Continue scrolling"}
                </div>
                <div className="flex space-x-2">
                  {roles.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index < visibleRoles ? "bg-neutral-600" : "bg-neutral-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    )
  },
)

ThreeSlideExperience.displayName = "ThreeSlideExperience"
