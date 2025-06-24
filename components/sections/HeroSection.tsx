"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg-primary">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-gradient mb-6"
        >
          Welcome to Aletheia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl text-neutral-700 mb-10 max-w-2xl mx-auto"
        >
          Building ethical, sentient-first technology for a better world.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/stem-for-all">
            <span className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
              Explore STEM for All <ArrowRight size={20} />
            </span>
          </Link>
          <Link href="/contact">
            <span className="btn-secondary inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-transform">
              Contact Us <Play size={20} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
