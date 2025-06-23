"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

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

  return (
    <section className="section-padding bg-primary-900 text-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="heading-2 mb-8">What we do</h2>
          </motion.div>

          {/* Main Quote */}
          <motion.div variants={itemVariants} className="mb-20">
            <blockquote className="quote-text text-primary-100 max-w-4xl mx-auto">
              "We solve business problems by tailoring solutions based on a mix of{" "}
              <em className="text-white font-medium">Strategy</em>, <em className="text-white font-medium">Content</em>,
              and <em className="text-white font-medium">Unique proposition</em>."
            </blockquote>
          </motion.div>

          {/* Core Principles */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="text-center">
              <h3 className="heading-3 mb-4 text-white">No white noise.</h3>
              <p className="body-text text-primary-300">Every solution is purposeful and meaningful.</p>
            </div>
            <div className="text-center">
              <h3 className="heading-3 mb-4 text-white">No BS.</h3>
              <p className="body-text text-primary-300">Honest, transparent, and authentic in everything we do.</p>
            </div>
          </motion.div>

          {/* Outsiders Section */}
          <motion.div variants={itemVariants} className="border-t border-primary-700 pt-16">
            <h3 className="heading-2 mb-8 text-white">
              <em>Outsiders by choice.</em>
            </h3>
            <p className="body-text text-primary-200 max-w-3xl mx-auto">
              We choose to stand apart, to think differently, and to challenge the status quo. Because that's where real
              innovation happens.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhatWeDoSection
