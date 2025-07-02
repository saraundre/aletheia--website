"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const SignatureSection = () => {
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
          {/* For Sentience */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-2xl md:text-3xl font-light italic text-neutral-500 mb-8">For Sentience,</p>
          </motion.div>

          {/* Handwritten Aletheia Signature */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-12 flex justify-center"
            >
              <div
                style={{
                  transform: "rotate(-2deg)",
                  filter: "drop-shadow(0 2px 4px rgba(239, 68, 68, 0.1))",
                }}
              >
                <Image
                  src="/founder/aletheia-signature.svg"
                  alt="Res Signature - Aletheia"
                  width={500}
                  height={200}
                  className="w-auto h-20 md:h-24 lg:h-28"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="btn-primary flex items-center space-x-2">
                  <span>Start a Conversation</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#stem-for-all" className="btn-secondary">
                  Explore Our Work
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants}>
            <p className="text-neutral-500 text-lg italic">Truth in tech, action in society.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default SignatureSection
