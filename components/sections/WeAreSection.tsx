"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const WeAreSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const roles = [
    { title: "Storytellers", description: "Crafting narratives that resonate" },
    { title: "Innovators", description: "Pushing boundaries of possibility" },
    { title: "Engineers", description: "Building robust, scalable solutions" },
    { title: "Designers", description: "Creating beautiful, intuitive experiences" },
    { title: "Strategists", description: "Aligning vision with execution" },
    { title: "Visionaries", description: "Seeing beyond the horizon" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
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

  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-24">
            <div className="inline-block mb-8">
              <div className="w-12 h-px bg-neutral-300 mx-auto mb-8" />
            </div>
            <h2 className="heading-2 mb-8">We are</h2>
            <p className="body-text max-w-2xl mx-auto">
              A collective of creative adults whom the 'child' in each of us survived.
            </p>
          </motion.div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <div className="card-minimal p-8 text-center h-full">
                  {/* Number */}
                  <div className="text-6xl font-light text-neutral-200 mb-6 group-hover:text-neutral-300 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <h3 className="heading-3 mb-4 group-hover:text-neutral-900 transition-colors duration-300">
                    {role.title}
                  </h3>
                  <p className="body-text text-neutral-500 leading-relaxed">{role.description}</p>

                  {/* Hover Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="h-px bg-neutral-900 mt-6 mx-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Quote */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="max-w-4xl mx-auto">
              <div className="w-24 h-px bg-neutral-300 mx-auto mb-8" />
              <p className="body-text-large italic text-neutral-700">
                "Building brands and bridging communities through world-class artistry and technologies."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default WeAreSection
