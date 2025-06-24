"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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

  return (
    <section className="section-padding bg-neutral-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center"
        >
          {/* CTA Card */}
          <motion.div variants={itemVariants} className="card-minimal p-12 max-w-2xl text-center">
            {/* Section Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="heading-3 text-neutral-900 mb-6">Join the Movement</h2>
              <p className="body-text text-neutral-600 leading-relaxed">
                Ready to make STEM education accessible to all? Partner with us to create equitable learning
                opportunities.
              </p>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="btn-primary flex items-center space-x-2">
                  <span>Get Involved</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="btn-secondary">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default StemCallToActionSection
