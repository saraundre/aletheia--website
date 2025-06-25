"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

const CollaboratorsCarousel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const logoMap = {
    "National Library Board": "/logos/NLB.png",
    "Rakuten Asia": "/logos/RakutenAsia.png", 
    "NUS": "/logos/NUS.jpg",
    "Digital Learning Institute": "/logos/DigitalLearningInstitute.png",
  }

  const collaborators = [
    "National Library Board",
    "Rakuten Asia", 
    "NUS",
    "Digital Learning Institute",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
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
        duration: 0.8,
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
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="w-12 h-px bg-neutral-300 mx-auto mb-8" />
            <h2 className="heading-2 text-neutral-900 mb-8">Trusted by</h2>
            <p className="body-text max-w-2xl mx-auto">
              Partnering with leading organizations to create meaningful impact.
            </p>
          </motion.div>

          {/* Logos Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {collaborators.map((collaborator, index) => (
              <motion.div
                key={collaborator}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <div className="bg-white border border-neutral-200 rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mx-auto">
                    <Image
                      src={logoMap[collaborator as keyof typeof logoMap]}
                      alt={collaborator}
                      width={96}
                      height={96}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Text */}
          <motion.div variants={itemVariants} className="mt-16">
            <p className="text-neutral-400 text-sm italic">Building partnerships that matter</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CollaboratorsCarousel
