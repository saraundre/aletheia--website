'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const WeAreSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const roles = [
    'Storytellers.',
    'Innovators.',
    'Engineers.',
    'Designers.',
    'Strategists.',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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

  const cardVariants = {
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
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="heading-2 text-dark-900 mb-6">
              We are
            </h2>
            <p className="body-text text-dark-600 max-w-3xl mx-auto leading-relaxed">
              We are a collective of creative adults whom the 'child' in each of us survived.
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {roles.map((role, index) => (
              <motion.div
                key={role}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="card p-8 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                  <span className="text-white font-bold text-xl">
                    {role.charAt(0)}
                  </span>
                </div>
                <h3 className="heading-3 text-dark-900 mb-4">
                  {role}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full group-hover:w-16 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Bottom Description */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto"
          >
            <p className="body-text text-dark-600 leading-relaxed">
              Building brands and bridging communities through world-class artistry and technologies.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WeAreSection 