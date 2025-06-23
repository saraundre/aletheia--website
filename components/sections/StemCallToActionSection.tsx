'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

const StemCallToActionSection = () => {
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white relative overflow-hidden">
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
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
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="heading-2 mb-6">
              Join the Movement
            </h2>
            <p className="body-text text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Ready to make STEM education accessible to all? Partner with us to create 
              equitable learning opportunities that transform lives and communities.
            </p>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                title: 'Make Impact',
                description: 'Help create real change in education accessibility',
                icon: '🌟'
              },
              {
                title: 'Build Community',
                description: 'Connect with like-minded educators and innovators',
                icon: '🤝'
              },
              {
                title: 'Drive Innovation',
                description: 'Shape the future of STEM education technology',
                icon: '🚀'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="heading-3 text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="btn-primary px-8 py-4 text-lg bg-white text-primary-600 hover:bg-gray-100">
                Get Involved
              </Link>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="btn-secondary px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom Message */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <p className="text-gray-300 text-lg">
              Every student deserves access to quality STEM education. 
              <br />
              <span className="text-white font-semibold">Let's make it happen together.</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default StemCallToActionSection 