"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

const CollaboratorsCarousel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Logos for select collaborators
  const logoMap = {
    "Rakuten Asia": "/logos/RakutenAsia.png",
    "National Library Board": "/logos/NLB.png",
    "Singapore University": "/logos/NUS.jpg",
  }

  const collaborators = [
    "Science Centre Singapore",
    "National Library Board",
    "Rakuten Asia",
    "STEM For All Charity",
    "Singapore University",
    "Tech Innovation Hub",
    "Digital Learning Institute",
    "Future Skills Academy",
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

          {/* Carousel Container */}
          <motion.div variants={itemVariants} className="relative overflow-hidden">
            {/* First Row - Moving Right */}
            <div className="flex space-x-8 mb-8 animate-scroll-right">
              {[...collaborators, ...collaborators].map((collaborator, index) => (
                <motion.div
                  key={`row1-${collaborator}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="card-minimal px-8 py-6 min-w-[280px] text-center group flex flex-col justify-center items-center">
                    <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mx-auto overflow-hidden">
                      {logoMap[collaborator] ? (
                        <Image
                          src={logoMap[collaborator]}
                          alt={collaborator + ' logo'}
                          width={96}
                          height={96}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <span className="text-neutral-600 font-bold text-3xl flex items-center justify-center w-full h-full">
                          {collaborator
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Row - Moving Left */}
            <div className="flex space-x-8 animate-scroll-left">
              {[...collaborators.slice().reverse(), ...collaborators.slice().reverse()].map((collaborator, index) => (
                <motion.div
                  key={`row2-${collaborator}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="card-minimal px-8 py-6 min-w-[280px] text-center group flex flex-col justify-center items-center">
                    <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mx-auto overflow-hidden">
                      {logoMap[collaborator] ? (
                        <Image
                          src={logoMap[collaborator]}
                          alt={collaborator + ' logo'}
                          width={96}
                          height={96}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <span className="text-neutral-600 font-bold text-3xl flex items-center justify-center w-full h-full">
                          {collaborator
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Text */}
          <motion.div variants={itemVariants} className="mt-16">
            <p className="text-neutral-400 text-sm italic">Building partnerships that matter</p>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }
        
        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default CollaboratorsCarousel
