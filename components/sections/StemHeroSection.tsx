'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const StemHeroSection = () => {
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full opacity-15 blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Main Title */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <h1 className="heading-1 text-dark-900 mb-6">
              <span className="block">STEM for All</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            variants={textVariants}
            className="mb-12"
          >
            <h2 className="heading-2 text-gradient mb-8">
              Equitable Learning Opportunities
            </h2>
            <p className="body-text text-dark-600 max-w-3xl mx-auto leading-relaxed">
              Creating accessible, inclusive learning experiences that reach every student, 
              regardless of background or ability. We believe that STEM education should be 
              a fundamental right, not a privilege.
            </p>
          </motion.div>

          {/* Key Points */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                title: 'Accessible',
                description: 'Breaking down barriers to STEM education',
                icon: '🔓'
              },
              {
                title: 'Inclusive',
                description: 'Welcoming all students regardless of background',
                icon: '🤝'
              },
              {
                title: 'Innovative',
                description: 'Using cutting-edge technology and methods',
                icon: '💡'
              }
            ].map((point, index) => (
              <motion.div
                key={point.title}
                variants={textVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="heading-3 text-dark-900 mb-2">{point.title}</h3>
                <p className="text-dark-600">{point.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Get Involved
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default StemHeroSection 