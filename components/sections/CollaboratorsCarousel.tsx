'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CollaboratorsCarousel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const collaborators = [
    { name: 'Science Centre Singapore', logo: 'SCS' },
    { name: 'National Library Board', logo: 'NLB' },
    { name: 'Rakuten Asia', logo: 'Rakuten' },
    { name: 'STEM For All Charity', logo: 'STEM For All' },
    { name: 'Singapore University', logo: 'SGU' },
    { name: 'Tech Innovation Hub', logo: 'TIH' },
    { name: 'Digital Learning Institute', logo: 'DLI' },
    { name: 'Future Skills Academy', logo: 'FSA' },
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

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="heading-2 text-dark-900 mb-6">
              Trusted by
            </h2>
            <p className="body-text text-dark-600 max-w-2xl mx-auto">
              Partnering with leading organizations to create meaningful impact through technology and innovation.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden"
          >
            {/* First Row - Scrolling */}
            <div className="flex space-x-12 animate-scroll">
              {[...collaborators, ...collaborators].map((collaborator, index) => (
                <motion.div
                  key={`${collaborator.name}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="card px-8 py-6 min-w-[200px] text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                      <span className="text-white font-bold text-lg">
                        {collaborator.logo.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-dark-900 text-sm">
                      {collaborator.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Row - Reverse Scrolling */}
            <div className="flex space-x-12 animate-scroll-reverse mt-8">
              {[...collaborators.reverse(), ...collaborators.reverse()].map((collaborator, index) => (
                <motion.div
                  key={`reverse-${collaborator.name}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="card px-8 py-6 min-w-[200px] text-center group bg-white/80 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                      <span className="text-white font-bold text-lg">
                        {collaborator.logo.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-dark-900 text-sm">
                      {collaborator.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Text */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <p className="text-dark-500 italic">
              Partner logos scroll horizontally
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll-reverse {
          animation: scroll-reverse 25s linear infinite;
        }
        
        .animate-scroll:hover,
        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default CollaboratorsCarousel 