"use client"

import { useState, useEffect, useRef } from "react"

interface ScrollWordsProps {
  words: string[]
  onComplete: () => void
}

export function ScrollWords({ words, onComplete }: ScrollWordsProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [isActive, setIsActive] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollCountRef = useRef(0)
  const isCompletedRef = useRef(false)

  useEffect(() => {
    const handleScroll = (e: WheelEvent | KeyboardEvent) => {
      if (!isActive || isCompletedRef.current) return

      e.preventDefault()
      e.stopPropagation()

      // Handle different scroll inputs
      let shouldAdvance = false

      if (e instanceof WheelEvent) {
        shouldAdvance = e.deltaY > 0 // Scroll down
      } else if (e instanceof KeyboardEvent) {
        shouldAdvance = e.key === "ArrowDown" || e.key === " " || e.key === "PageDown"
      }

      if (shouldAdvance) {
        scrollCountRef.current++

        if (scrollCountRef.current > currentWordIndex + 1 && currentWordIndex < words.length - 1) {
          setCurrentWordIndex((prev) => prev + 1)
        } else if (currentWordIndex >= words.length - 1) {
          // Animation complete
          isCompletedRef.current = true
          setTimeout(() => {
            setIsActive(false)
            onComplete()
          }, 1000) // Wait 1 second after last word
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isActive && !isCompletedRef.current) {
        e.preventDefault()
      }
    }

    if (isActive) {
      // Prevent all scrolling
      document.body.style.overflow = "hidden"
      window.addEventListener("wheel", handleScroll, { passive: false })
      window.addEventListener("keydown", handleScroll, { passive: false })
      window.addEventListener("touchmove", handleTouchMove, { passive: false })
    }

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("keydown", handleScroll)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isActive, currentWordIndex, words.length, onComplete])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isCompletedRef.current) {
          setIsActive(true)
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="h-screen flex items-start justify-center bg-neutral-50 relative pt-6">
      <div className="text-center space-y-8 max-w-4xl px-6">
        {words.map((word, index) => (
          <div
            key={word}
            className={`text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight transition-all duration-1000 ease-out ${
              index <= currentWordIndex ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
            style={{
              transitionDelay:
                index <= currentWordIndex ? `${(index - Math.max(0, currentWordIndex - 4)) * 200}ms` : "0ms",
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      {isActive && !isCompletedRef.current && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-400 text-sm animate-pulse">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs uppercase tracking-wider">Scroll to continue</div>
            <div className="w-1 h-8 bg-neutral-300 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full bg-neutral-600 rounded-full transition-all duration-300"
                style={{ height: `${((currentWordIndex + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
