'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ContactHeroSection = () => {
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200 rounded-full opacity-20 blur-3xl"
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
              <span className="block">Let's Talk —</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            variants={textVariants}
            className="mb-12"
          >
            <h2 className="heading-2 text-gradient mb-8">
              No Middlemen
            </h2>
            <p className="body-text text-dark-600 max-w-3xl mx-auto leading-relaxed">
              Interested in piloting Spark.OS? Want to support ethical tech development? 
              Let's connect and build something that <span className="font-semibold text-primary-600">matters</span>.
            </p>
          </motion.div>

          {/* Key Points */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                title: 'Direct Contact',
                description: 'Speak directly with our team',
                icon: '💬'
              },
              {
                title: 'Quick Response',
                description: 'We typically respond within 24-48 hours',
                icon: '⚡'
              },
              {
                title: 'No Spam',
                description: 'Just honest communication',
                icon: '✅'
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

          {/* Scroll Indicator */}
          <motion.div
            variants={textVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-dark-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-dark-400 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactHeroSection 