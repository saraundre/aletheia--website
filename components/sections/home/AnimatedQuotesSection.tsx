"use client"

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const quotes = [
  {
    title: "The Reason of Being",
    content: "We are a collective of creative adults whom the 'child' in each of us survived.",
    animation: "typewriter",
    type: "normal"
  },
  {
    title: "We are",
    content: "Storytellers. Innovators. Engineers. Designers. Strategists.",
    animation: "changing-words",
    type: "scroll-locked",
    words: ["Storytellers.", "Innovators.", "Engineers.", "Designers.", "Strategists."]
  },
  {
    title: "Our Mission",
    content: "Building brands and bridging communities through world-class artistry and technologies.",
    animation: "split-reveal",
    type: "normal"
  },
  {
    title: "Our Approach",
    content: "We solve business problems by tailoring solutions based on a mix of strategy, content and unique proposition.",
    animation: "morphing",
    type: "normal"
  },
  {
    title: "Our Promise",
    content: "No communications white noise and BS.",
    animation: "matrix",
    type: "normal"
  },
  {
    title: "Our Ethos",
    content: "Relentlessly pursuing perfection, we are outsiders. By choice.",
    animation: "philosophical",
    type: "normal"
  }
]

export default function AnimatedQuotesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]))
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isChangingWordsActive, setIsChangingWordsActive] = useState(false)
  const [currentSnapIndex, setCurrentSnapIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const containerTop = containerRect.top
      
      // Calculate which section should be visible based on container position
      const sectionIndex = Math.round(-containerTop / viewportHeight)
      const clampedIndex = Math.max(0, Math.min(sectionIndex, quotes.length - 1))
      
      setCurrentSnapIndex(clampedIndex)
      
      // Update visible sections based on which section is in the center of viewport
      const newVisibleSections = new Set<number>()
      newVisibleSections.add(clampedIndex)
      setVisibleSections(newVisibleSections)
      
      // Handle changing words animation for section 1
      if (clampedIndex === 1 && !isChangingWordsActive) {
        setIsChangingWordsActive(true)
        setCurrentWordIndex(0)
        
        // Start word cycling
        const wordInterval = setInterval(() => {
          setCurrentWordIndex((prev) => {
            const next = (prev + 1) % 5
            if (next === 0) {
              // Animation complete
              setIsChangingWordsActive(false)
              clearInterval(wordInterval)
            }
            return next
          })
        }, 1500)
        
        return () => clearInterval(wordInterval)
      } else if (clampedIndex !== 1) {
        setIsChangingWordsActive(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isChangingWordsActive])

  const renderTypewriterAnimation = (quote: any, index: number) => {
    const isVisible = visibleSections.has(index)
    
    return (
      <div className="relative">
        <motion.h2
          className="heading-xl mb-8 font-extrabold tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {quote.title.split('').map((char: string, charIndex: number) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                delay: isVisible ? charIndex * 0.05 : 0,
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>
        
        <motion.p
          className="body-lg text-slate-600 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: isVisible ? 1.5 : 0, duration: 0.8, ease: "easeOut" }}
        >
          {quote.content}
        </motion.p>
      </div>
    )
  }

  const renderChangingWordsAnimation = (quote: any, index: number) => {
    const isVisible = visibleSections.has(index)
    
    return (
      <div className="relative">
        <motion.h2
          className="heading-xl mb-8 font-extrabold tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {quote.title}
        </motion.h2>
        
        <motion.div
          className="body-lg text-slate-600 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: isVisible ? 0.5 : 0, duration: 0.8, ease: "easeOut" }}
        >
          {quote.words?.map((word: string, wordIndex: number) => (
            <motion.span
              key={wordIndex}
              className="inline-block mx-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible && wordIndex === currentWordIndex ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    )
  }

  const renderSplitRevealAnimation = (quote: any, index: number) => {
    const isVisible = visibleSections.has(index)
    
    return (
      <div className="relative overflow-hidden">
        <div className="flex flex-col items-center">
          <motion.h2
            className="heading-xl mb-8 font-extrabold tracking-tight"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isVisible ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {quote.title}
          </motion.h2>
          
          <motion.div
            className="w-full max-w-3xl"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={isVisible ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ delay: isVisible ? 0.8 : 0, duration: 1, ease: "easeOut" }}
          >
            <p className="body-lg text-slate-600 text-center">
              {quote.content}
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

  const renderMorphingAnimation = (quote: any, index: number) => {
    const isVisible = visibleSections.has(index)
    
    return (
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100"
          initial={{ scale: 0, rotate: 180 }}
          animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        <motion.div className="relative z-10 text-center">
          <motion.h2
            className="heading-xl mb-8 font-extrabold tracking-tight"
            initial={{ y: 100, rotateX: 90 }}
            animate={isVisible ? { y: 0, rotateX: 0 } : { y: 100, rotateX: 90 }}
            transition={{ delay: isVisible ? 0.5 : 0, duration: 0.8, ease: "easeOut" }}
          >
            {quote.title}
          </motion.h2>
          
          <motion.p
            className="body-lg text-slate-600 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: isVisible ? 1.2 : 0, duration: 0.6, ease: "easeOut" }}
          >
            {quote.content}
          </motion.p>
        </motion.div>
      </div>
    )
  }

  const renderMatrixAnimation = (quote: any, index: number) => {
    const isVisible = visibleSections.has(index)
    
    return (
      <div className="relative">
        <motion.div className="relative z-10 text-center">
          <motion.h2
            className="heading-xl mb-8 font-extrabold tracking-tight"
            initial={{ letterSpacing: "2em", opacity: 0 }}
            animate={isVisible ? { letterSpacing: "0.1em", opacity: 1 } : { letterSpacing: "2em", opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {quote.title}
          </motion.h2>
          
          <motion.p
            className="body-lg text-slate-600 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: isVisible ? 1 : 0, duration: 0.8, ease: "easeOut" }}
          >
            {quote.content}
          </motion.p>
        </motion.div>
      </div>
    )
  }

  const renderPhilosophicalAnimation = (quote: any, index: number) => {
    const isVisible = visibleSections.has(index)
    
    return (
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        <motion.div className="relative z-10 text-center">
          <motion.h2
            className="heading-xl mb-8 font-extrabold tracking-tight"
            initial={{ y: -100, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
            transition={{ delay: isVisible ? 0.3 : 0, duration: 0.8, ease: "easeOut" }}
          >
            {quote.title}
          </motion.h2>
          
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-neutral-400 to-neutral-600 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: isVisible ? 0.8 : 0, duration: 0.6, ease: "easeOut" }}
          />
          
          <motion.p
            className="body-lg text-slate-600 max-w-3xl mx-auto text-center italic"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: isVisible ? 1.2 : 0, duration: 0.8, ease: "easeOut" }}
          >
            {quote.content}
          </motion.p>
        </motion.div>
      </div>
    )
  }

  const getAnimationComponent = (quote: any, index: number) => {
    switch (quote.animation) {
      case 'typewriter':
        return renderTypewriterAnimation(quote, index)
      case 'changing-words':
        return renderChangingWordsAnimation(quote, index)
      case 'split-reveal':
        return renderSplitRevealAnimation(quote, index)
      case 'morphing':
        return renderMorphingAnimation(quote, index)
      case 'matrix':
        return renderMatrixAnimation(quote, index)
      case 'philosophical':
        return renderPhilosophicalAnimation(quote, index)
      default:
        return renderTypewriterAnimation(quote, index)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Individual Quote Sections */}
      {quotes.map((quote, index) => (
        <section
          key={index}
          className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative snap-start"
        >
          {getAnimationComponent(quote, index)}
        </section>
      ))}
    </div>
  )
} 