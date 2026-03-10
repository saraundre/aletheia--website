"use client"

import { Home, X } from "lucide-react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { StemProgrammePanels } from "./components/StemProgrammePanels"

export default function StemForAll() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showFooter, setShowFooter] = useState(false);
  const [hasHeroTyped, setHasHeroTyped] = useState(false)
  const [heroTypedTitle, setHeroTypedTitle] = useState("")
  const heroRef = useRef<HTMLElement | null>(null)
  const scopeRef = useRef<HTMLElement | null>(null)
  const scopePanelsRef = useRef<Array<HTMLElement | null>>([])
  const scopeWheelLockRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 32; // px from bottom
      if (window.innerWidth < 768) {
        setShowFooter(window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  })

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: scopeProgress } = useScroll({
    target: scopeRef,
    offset: ["start end", "end start"],
  })

  const HERO_TITLE = "STEM for All"

  const heroY = useTransform(
    heroProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [56, -36]
  )

  const scopeTilt = useTransform(
    scopeProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [0.7, 0, -0.7]
  )

  const scopeScale = useTransform(
    scopeProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.995, 1.005, 0.995]
  )

  const revealItem = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 28,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const revealPanel = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 46,
      scale: prefersReducedMotion ? 1 : 0.988,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const revealClip = {
    hidden: {
      opacity: 0,
      clipPath: prefersReducedMotion ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
      y: prefersReducedMotion ? 0 : 20,
    },
    show: {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const panelViewport = { once: false, amount: 0.52 }

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroTypedTitle(HERO_TITLE)
      setHasHeroTyped(true)
    }
  }, [prefersReducedMotion, HERO_TITLE])

  useEffect(() => {
    if (!hasHeroTyped || prefersReducedMotion) {
      return
    }
    let index = 0
    const intervalId = setInterval(() => {
      index += 1
      setHeroTypedTitle(HERO_TITLE.slice(0, index))
      if (index >= HERO_TITLE.length) {
        clearInterval(intervalId)
      }
    }, 28)

    return () => clearInterval(intervalId)
  }, [hasHeroTyped, prefersReducedMotion, HERO_TITLE])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const shouldEnableDesktopSnap = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches
    if (!shouldEnableDesktopSnap) {
      return
    }

    const handleWheel = (event: WheelEvent) => {
      const section = scopeRef.current
      if (!section) {
        return
      }

      const sectionRect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const isWithinStemPanels =
        sectionRect.top < viewportHeight * 0.5 && sectionRect.bottom > viewportHeight * 0.5

      if (!isWithinStemPanels) {
        return
      }

      const panels = scopePanelsRef.current.filter((panel): panel is HTMLElement => panel !== null)
      if (panels.length === 0) {
        return
      }

      const direction = Math.sign(event.deltaY)
      if (direction === 0) {
        return
      }

      const firstPanelRect = panels[0].getBoundingClientRect()
      const lastPanelRect = panels[panels.length - 1].getBoundingClientRect()
      const entrySnapOffset = viewportHeight * 0.08
      const enteringStemFromTop = direction > 0 && firstPanelRect.top > entrySnapOffset
      const enteringStemFromBottom =
        direction < 0 && lastPanelRect.bottom < viewportHeight - entrySnapOffset

      if (enteringStemFromTop) {
        if (scopeWheelLockRef.current) {
          event.preventDefault()
          return
        }

        event.preventDefault()
        scopeWheelLockRef.current = true
        panels[0].scrollIntoView({ behavior: "smooth", block: "start" })

        window.setTimeout(() => {
          scopeWheelLockRef.current = false
        }, 650)
        return
      }

      if (enteringStemFromBottom) {
        if (scopeWheelLockRef.current) {
          event.preventDefault()
          return
        }

        event.preventDefault()
        scopeWheelLockRef.current = true
        panels[panels.length - 1].scrollIntoView({ behavior: "smooth", block: "start" })

        window.setTimeout(() => {
          scopeWheelLockRef.current = false
        }, 650)
        return
      }

      let activeIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY
      for (let index = 0; index < panels.length; index += 1) {
        const rect = panels[index].getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const distance = Math.abs(center - viewportHeight / 2)
        if (distance < nearestDistance) {
          nearestDistance = distance
          activeIndex = index
        }
      }

      const nextIndex =
        direction > 0
          ? Math.min(activeIndex + 1, panels.length - 1)
          : Math.max(activeIndex - 1, 0)

      if (nextIndex === activeIndex) {
        return
      }

      if (scopeWheelLockRef.current) {
        event.preventDefault()
        return
      }

      event.preventDefault()
      scopeWheelLockRef.current = true
      panels[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" })

      window.setTimeout(() => {
        scopeWheelLockRef.current = false
      }, 650)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [prefersReducedMotion])

  const heroTypingActive = !prefersReducedMotion && hasHeroTyped && heroTypedTitle.length < HERO_TITLE.length

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif">
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 h-40 w-px bg-neutral-300/70">
        <motion.div
          className="w-full h-full bg-neutral-900/55 origin-top"
          style={{ scaleY: smoothProgress }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/aletheia_logo.png"
                alt="Aletheia Logo"
                width={100}
                height={32}
                className="object-contain"
              />
            </Link>
            <button onClick={toggleMenu} className="hover:opacity-70 transition-opacity" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Home className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-50/95 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-8">
              <nav className="space-y-6">
                <Link
                  href="/stem-for-all"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stem for All
                </Link>
                <Link
                  href="/tech4all"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tech4All
                </Link>
                <Link
                  href="/about"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/gallery"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24 pb-16 md:pb-8">
        {/* Section 1 - John Lennon Quote (First) */}
        <motion.section
          className="max-w-3xl mx-auto px-6 py-16 md:py-24"
          variants={revealItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-8">
            {/* Main Quote */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-normal leading-relaxed tracking-wide text-neutral-700">
                "You may say I'm a dreamer
              </p>
              <p className="text-xl md:text-2xl font-normal leading-relaxed tracking-wide text-neutral-700">
                But I'm not the only one
              </p>
              <p className="text-xl md:text-2xl font-normal leading-relaxed tracking-wide text-neutral-700">
                I hope someday you'll join us
              </p>
              <p className="text-xl md:text-2xl font-normal leading-relaxed tracking-wide text-neutral-700">
                And the world will be as one"
              </p>
            </div>

            {/* Song Title */}
            <div className="pt-8 space-y-2">
              <p className="text-lg font-normal tracking-wide text-neutral-600">John Lennon</p>
              <p className="text-lg font-normal italic tracking-wide text-neutral-500">"Imagine"</p>
            </div>

            {/* Attribution */}
            <div className="pt-8 border-t border-neutral-200">
              <p className="text-base font-normal tracking-wide text-neutral-600">Imagine, 1971</p>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Hero Section (Second) */}
        <motion.section
          ref={heroRef}
          className="max-w-4xl mx-auto px-6 py-16 md:py-24"
          variants={revealItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ y: heroY }}
          onViewportEnter={() => {
            if (!hasHeroTyped) {
              setHeroTypedTitle(HERO_TITLE.slice(0, 1))
              setHasHeroTyped(true)
            }
          }}
        >
          <div className="text-center space-y-8">
            {/* Main Title */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-neutral-900"
              variants={revealClip}
            >
              {hasHeroTyped ? heroTypedTitle : HERO_TITLE}
              {heroTypingActive && (
                <motion.span
                  className="inline-block ml-1 text-neutral-500"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                >
                  |
                </motion.span>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-wide leading-relaxed text-neutral-600 mt-1"
              variants={revealClip}
            >
              Equitable Learning Opportunities
            </motion.h2>

            {/* Description */}
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-2xl mx-auto mt-8">
              Supporting accessible and inclusive learning for the under-resourced, neurodivergent and physically challenged.
            </p>

            {/* Call to Action */}
            <motion.div
              className="pt-8 flex justify-center"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.015 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <Link
                href="/gallery"
                className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
              >
                See Us in Action
              </Link>
            </motion.div>

            {/* Divider */}
            <div className="flex justify-center mt-12">
              <div className="w-24 h-px bg-neutral-300"></div>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* STEMforALL Programme Details */}
        <section ref={scopeRef} className="mx-auto max-w-7xl px-6">
          <motion.div
            className="relative overflow-hidden"
            style={{ rotate: scopeTilt, scale: scopeScale }}
          >
            <StemProgrammePanels
              panelViewport={panelViewport}
              prefersReducedMotion={prefersReducedMotion}
              revealClip={revealClip}
              revealPanel={revealPanel}
              scopePanelsRef={scopePanelsRef}
            />
          </motion.div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Join the Movement Section */}
        <motion.section
          className="max-w-3xl mx-auto px-6 py-16 md:py-24"
          variants={revealItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-neutral-900">
              Join the Movement
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600">
              All people, sharing all of the world.
            </p>
            <motion.div
              className="pt-8"
              whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.015 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <Link
                href="/contact"
                className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
              >
                Get Involved
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 bg-neutral-50/80 backdrop-blur-sm ${showFooter ? '' : 'hidden'} md:block`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs font-normal tracking-wide text-neutral-600">&copy; 2024 Aletheia</div>
            <div className="flex space-x-2 text-xs font-normal tracking-wide text-neutral-600">
              <Link
                href="/stem-for-all"
                className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 text-xs md:text-sm"
              >
                Stem for All
              </Link>
              <Link
                href="/tech4all"
                className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100"
              >
                Tech4All
              </Link>
              <Link
                href="/about"
                className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100"
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

