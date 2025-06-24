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
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const services = [
    { title: "Strategy", description: "Data-driven insights that guide decision-making" },
    { title: "Content", description: "Compelling narratives that engage and inspire" },
    { title: "Unique Proposition", description: "Distinctive value that sets you apart" },
  ]

  return (
    <section className="section-padding bg-neutral-900 text-white relative overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-white rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="w-12 h-px bg-white/30 mx-auto mb-8" />
            <h2 className="heading-2 mb-8 text-white">What we do</h2>
          </motion.div>

          {/* Main Quote */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="text-center mb-16">
              <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white/90 max-w-4xl mx-auto">
                "We solve business problems by tailoring solutions based on a mix of{" "}
                <em className="text-white font-normal">Strategy</em>,{" "}
                <em className="text-white font-normal">Content</em>, and{" "}
                <em className="text-white font-normal">Unique proposition</em>."
              </blockquote>
            </div>

            {/* Service Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-minimal rounded-full px-8 py-4 border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <span className="text-white font-medium">{service.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Principles */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h3 className="heading-3 mb-4 text-white">No white noise.</h3>
              <p className="body-text text-white/70">
                Every solution is purposeful, meaningful, and drives real results.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 border-2 border-white rounded-full" />
              </div>
              <h3 className="heading-3 mb-4 text-white">No BS.</h3>
              <p className="body-text text-white/70">Honest, transparent, and authentic in everything we create.</p>
            </div>
          </motion.div>

          {/* Outsiders Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="w-24 h-px bg-white/30 mx-auto mb-8" />
            <h3 className="text-4xl md:text-5xl font-light italic text-white mb-8">Outsiders by choice.</h3>
            <p className="body-text-large text-white/80 max-w-3xl mx-auto">
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
