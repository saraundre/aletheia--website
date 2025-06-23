"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-subtle">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="heading-1 text-primary-900 mb-8">
              <span className="block">No white noise.</span>
              <span className="block">No BS.</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className="body-text text-primary-600 max-w-3xl mx-auto">
              A collective of creative adults whom the 'child' in each of us survived. Building brands and bridging
              communities through world-class artistry and technologies.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact" className="btn-primary">
              Start a Conversation
            </Link>
            <Link href="/stem-for-all" className="btn-secondary">
              Explore Our Work
            </Link>
          </motion.div>

          {/* Status Indicator */}
          <motion.div variants={itemVariants} className="mt-16 flex items-center justify-center space-x-3">
            <div className="status-online animate-pulse" />
            <span className="text-primary-500 text-sm">Available for new projects</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
