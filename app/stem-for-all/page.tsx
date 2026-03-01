"use client"

import { Handshake, Heart, Home, Microscope, Sprout, Target, X } from "lucide-react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function StemForAll() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showFooter, setShowFooter] = useState(false);
  const [hasHeroTyped, setHasHeroTyped] = useState(false)
  const [hasScopeTyped, setHasScopeTyped] = useState(false)
  const [heroTypedTitle, setHeroTypedTitle] = useState("")
  const [scopeTypedTitle, setScopeTypedTitle] = useState("")
  const heroRef = useRef<HTMLElement | null>(null)
  const scopeRef = useRef<HTMLElement | null>(null)

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
  const SCOPE_TITLE = "Research-backed learning. Inclusive by design."

  const heroY = useTransform(
    heroProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [56, -36]
  )

  const scopeTilt = useTransform(
    scopeProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [0.8, 0, -0.8]
  )

  const scopeScale = useTransform(
    scopeProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.985, 1.01, 0.99]
  )

  const topOrbY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -120])
  const bottomOrbY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120])

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

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
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

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroTypedTitle(HERO_TITLE)
      setScopeTypedTitle(SCOPE_TITLE)
      setHasHeroTyped(true)
      setHasScopeTyped(true)
    }
  }, [prefersReducedMotion, HERO_TITLE, SCOPE_TITLE])

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
    if (!hasScopeTyped || prefersReducedMotion) {
      return
    }
    let index = 0
    const intervalId = setInterval(() => {
      index += 1
      setScopeTypedTitle(SCOPE_TITLE.slice(0, index))
      if (index >= SCOPE_TITLE.length) {
        clearInterval(intervalId)
      }
    }, 18)

    return () => clearInterval(intervalId)
  }, [hasScopeTyped, prefersReducedMotion, SCOPE_TITLE])

  const heroTypingActive = !prefersReducedMotion && hasHeroTyped && heroTypedTitle.length < HERO_TITLE.length
  const scopeTypingActive = !prefersReducedMotion && hasScopeTyped && scopeTypedTitle.length < SCOPE_TITLE.length

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neutral-900/20 via-neutral-900/50 to-neutral-900/20 z-[60] origin-left"
        style={{ scaleX: smoothProgress }}
      />
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
                className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg"
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

        {/* STEMforALL Programme Scope */}
        <section ref={scopeRef} className="max-w-6xl mx-auto px-6 py-8 md:py-12">
          <motion.div
            className="relative rounded-3xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-100/70 px-5 py-8 md:px-10 md:py-12 shadow-sm overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            style={{ rotate: scopeTilt, scale: scopeScale }}
            onViewportEnter={() => {
              if (!hasScopeTyped) {
                setScopeTypedTitle(SCOPE_TITLE.slice(0, 1))
                setHasScopeTyped(true)
              }
            }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-neutral-200/40 blur-3xl"
              style={{ y: topOrbY }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-neutral-200/35 blur-3xl"
              style={{ y: bottomOrbY }}
            />

            <div className="relative space-y-8 md:space-y-10">
              <motion.div className="text-center space-y-4" variants={revealItem}>
                <p className="text-xs md:text-sm font-medium tracking-[0.28em] uppercase text-neutral-500">
                  STEMforALL Programme Scope
                </p>
                <motion.h2
                  className="text-2xl md:text-4xl font-bold tracking-tight leading-tight text-neutral-900"
                  variants={revealClip}
                >
                  {hasScopeTyped ? scopeTypedTitle : SCOPE_TITLE}
                  {scopeTypingActive && (
                    <motion.span
                      className="inline-block ml-1 text-neutral-500"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    >
                      |
                    </motion.span>
                  )}
                </motion.h2>
                <div className="w-20 h-px bg-neutral-300 mx-auto"></div>
              </motion.div>

              <motion.section
                className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm space-y-5"
                variants={revealItem}
                whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                    <Sprout className="w-4 h-4" />
                  </span>
                  <motion.h3
                    className="text-xl md:text-2xl font-bold tracking-tight leading-tight text-neutral-900"
                    variants={revealClip}
                  >
                    ABOUT STEMFORALL
                  </motion.h3>
                </div>
                <div className="space-y-4">
                  <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
                    STEMforALL is a social impact education initiative initiated by Aletheia EdTech R&amp;D Singapore.
                  </p>
                  <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
                    We believe that education should never be limited by financial background or learning differences.
                  </p>
                  <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
                    In today&apos;s AI-driven world, STEM skills are essential. This programme provides free, inclusive, and child-centred STEM learning to help every child build confidence, curiosity, and future-ready skills.
                  </p>
                </div>
              </motion.section>

              <div className="grid gap-5 md:gap-6 md:grid-cols-2">
                <motion.section
                  className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 shadow-sm space-y-5"
                  variants={revealItem}
                  whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                      <Microscope className="w-4 h-4" />
                    </span>
                    <motion.h3
                      className="text-xl md:text-2xl font-bold tracking-tight leading-tight text-neutral-900"
                      variants={revealClip}
                    >
                      WHAT CHILDREN WILL EXPERIENCE
                    </motion.h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-base md:text-lg font-normal leading-relaxed tracking-wide text-neutral-600 marker:text-neutral-400">
                    <li>Hands-on STEM activities (robotics, logic thinking, creative exploration)</li>
                    <li>AI-assisted adaptive learning powered by SparkOS</li>
                    <li>Emotion-aware and behaviour-responsive learning support</li>
                    <li>Small-group guidance in a safe, low-stress environment</li>
                    <li>Learning designed for different abilities and learning styles</li>
                  </ul>
                </motion.section>

                <motion.section
                  className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 shadow-sm space-y-5"
                  variants={revealItem}
                  whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                      <Handshake className="w-4 h-4" />
                    </span>
                    <motion.h3
                      className="text-xl md:text-2xl font-bold tracking-tight leading-tight text-neutral-900"
                      variants={revealClip}
                    >
                      COLLABORATION PARTNERS
                    </motion.h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-base md:text-lg font-normal leading-relaxed tracking-wide text-neutral-600 marker:text-neutral-400">
                    <li>Aletheia EdTech R&amp;D Singapore</li>
                    <li>SparkOS Education Ecosystem</li>
                    <li>Nanyang Technological University (NTU), Singapore</li>
                    <li>Robotics Games Society (RGS)</li>
                    <li>Educators, community partners, and volunteers</li>
                  </ul>
                </motion.section>

                <motion.section
                  className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 shadow-sm space-y-5"
                  variants={revealItem}
                  whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                      <Heart className="w-4 h-4" />
                    </span>
                    <motion.h3
                      className="text-xl md:text-2xl font-bold tracking-tight leading-tight text-neutral-900"
                      variants={revealClip}
                    >
                      WHY THIS PROGRAMME IS FREE
                    </motion.h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
                      We believe every child deserves to be seen, understood, and supported.
                    </p>
                    <p className="text-base md:text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
                      STEMforALL removes financial and systemic barriers to education, especially for children with special learning needs. This initiative is part of Aletheia&apos;s Tech-for-Good commitment, using technology and education research to create meaningful social impact.
                    </p>
                  </div>
                </motion.section>

                <motion.section
                  className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 shadow-sm space-y-5"
                  variants={revealItem}
                  whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                      <Target className="w-4 h-4" />
                    </span>
                    <motion.h3
                      className="text-xl md:text-2xl font-bold tracking-tight leading-tight text-neutral-900"
                      variants={revealClip}
                    >
                      LEARNING OUTCOMES
                    </motion.h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-base md:text-lg font-normal leading-relaxed tracking-wide text-neutral-600 marker:text-neutral-400">
                    <li>Increased curiosity and creativity</li>
                    <li>Stronger confidence and motivation</li>
                    <li>Improved problem-solving skills</li>
                    <li>A positive, supportive learning experience</li>
                  </ul>
                  <div className="pt-3 border-t border-neutral-200 space-y-2">
                    <p className="text-lg md:text-xl font-semibold tracking-wide text-neutral-900">
                      STEMforALL &mdash; Tech for Good &middot; Education for All
                    </p>
                    <p className="text-base md:text-lg font-normal tracking-wide text-neutral-600">
                      Powered by SparkOS Education Ecosystem
                    </p>
                  </div>
                </motion.section>
              </div>
            </div>
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
                className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg"
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
            <div className="text-xs font-normal tracking-wide text-neutral-600">© 2024 Aletheia</div>
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
