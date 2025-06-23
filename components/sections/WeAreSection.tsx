"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const WeAreSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const roles = ["Storytellers.", "Innovators.", "Engineers.", "Designers.", "Strategists."]

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

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="heading-2 text-primary-900 mb-8">We are</h2>
            <p className="body-text text-primary-600 max-w-3xl mx-auto">
              We are a collective of creative adults whom the 'child' in each of us survived.
            </p>
          </motion.div>

          {/* Role Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {roles.map((role, index) => (
              <motion.div key={role} variants={itemVariants} className="text-center group">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <span className="text-primary-900 font-light text-2xl">{role.charAt(0)}</span>
                </div>
                <h3 className="heading-3 text-primary-900 mb-4">{role}</h3>
                <div className="w-12 h-px bg-primary-300 mx-auto" />
              </motion.div>
            ))}
          </div>

          {/* Bottom Description */}
          <motion.div variants={itemVariants}>
            <p className="body-text text-primary-600 max-w-4xl mx-auto">
              Building brands and bridging communities through world-class artistry and technologies.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WeAreSection
