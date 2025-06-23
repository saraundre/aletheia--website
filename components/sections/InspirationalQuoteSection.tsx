'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
    <section className="section-padding bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Quote Lines */}
          <div className="space-y-6 mb-12">
            {[
              "You may say I'm a dreamer",
              "But I'm not the only one",
              "I hope someday you'll join us",
              "And the world will be as one"
            ].map((line, index) => (
              <motion.div
                key={index}
                variants={lineVariants}
                className="text-2xl md:text-3xl lg:text-4xl font-light text-dark-800 leading-relaxed"
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Song Title */}
          <motion.div
            variants={lineVariants}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gradient italic">
              "Imagine"
            </h2>
          </motion.div>

          {/* Author */}
          <motion.div
            variants={authorVariants}
            className="border-t border-dark-200 pt-8"
          >
            <p className="text-xl text-dark-600 font-medium">
              John Lennon, 1971
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            variants={lineVariants}
            className="mt-12 flex justify-center space-x-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-primary-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-3 h-3 bg-accent-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-3 h-3 bg-primary-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default InspirationalQuoteSection 