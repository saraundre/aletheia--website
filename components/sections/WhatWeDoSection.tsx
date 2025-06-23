'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const WhatWeDoSection = () => {
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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/20 to-accent-900/20" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="heading-2 mb-8">
              What we do
            </h2>
          </motion.div>

          {/* Main Quote */}
          <motion.div
            variants={textVariants}
            className="mb-12"
          >
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed italic text-gray-200 mb-8">
              "We solve business problems by tailoring solutions based on a mix of{' '}
              <span className="text-gradient font-semibold">Strategy</span>,{' '}
              <span className="text-gradient font-semibold">Content</span>, and{' '}
              <span className="text-gradient font-semibold">Unique proposition</span>."
            </blockquote>
          </motion.div>

          {/* Core Principles */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary-300">
                No white noise.
              </h3>
              <p className="text-gray-300">
                Every solution is purposeful and meaningful.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary-300">
                No BS.
              </h3>
              <p className="text-gray-300">
                Honest, transparent, and authentic in everything we do.
              </p>
            </div>
          </motion.div>

          {/* Outsiders Section */}
          <motion.div
            variants={textVariants}
            className="border-t border-gray-700 pt-12"
          >
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Outsiders by choice.
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We choose to stand apart, to think differently, and to challenge the status quo. 
                Because that's where real innovation happens.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatWeDoSection 