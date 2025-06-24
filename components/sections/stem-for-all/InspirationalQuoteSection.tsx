"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const InspirationalQuoteSection = () => {
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

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const authorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.5,
      },
    },
  }

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Quote Lines */}
          <div className="space-y-6 mb-16">
            {[
              "You may say I'm a dreamer",
              "But I'm not the only one",
              "I hope someday you'll join us",
              "And the world will be as one",
            ].map((line, index) => (
              <motion.div
                key={index}
                variants={lineVariants}
                className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-700 leading-relaxed"
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Song Title */}
          <motion.div variants={lineVariants} className="mb-2">
            <h2 className="text-2xl md:text-3xl font-light italic text-neutral-600">"Imagine"</h2>
          </motion.div>

          {/* Song Title Repeat */}
          <motion.div variants={lineVariants} className="mb-8">
            <h3 className="text-xl md:text-2xl font-light italic text-neutral-500">Imagine</h3>
          </motion.div>

          {/* Author */}
          <motion.div variants={authorVariants} className="border-t border-neutral-200 pt-8">
            <p className="text-lg text-neutral-600 font-medium">John Lennon, 1971</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default InspirationalQuoteSection
