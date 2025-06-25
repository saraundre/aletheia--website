"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Play, ExternalLink } from "lucide-react"

const VideoContentSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const videos = [
    {
      title: "STEM for All: Equitable Learning",
      description: "Discover how we're making STEM education accessible to every student",
      duration: "5:32",
    },
    {
      title: "Prof Marcelo Ang",
      description: "Educational leadership and innovation in STEM",
      duration: "8:15",
    },
  ]

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
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="w-12 h-px bg-neutral-300 mx-auto mb-8" />
            <h2 className="heading-2 text-neutral-900 mb-8">Stories in Motion</h2>
            <p className="body-text text-neutral-600 max-w-3xl mx-auto">
              Watch our journey unfold through conversations with educators, innovators, and the communities we serve.
            </p>
          </motion.div>

          {/* Video Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.title}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group cursor-pointer h-full"
              >
                <div className="card-minimal overflow-hidden h-full flex flex-col">
                  {/* Video Thumbnail */}
                  <div className="relative h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden flex-shrink-0">
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-all duration-300"
                      >
                        <Play size={24} className="text-neutral-600 ml-1" fill="currentColor" />
                      </motion.div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="heading-3 text-neutral-900 group-hover:text-neutral-700 transition-colors duration-300">
                        {video.title}
                      </h3>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-neutral-600 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0"
                      >
                        <ExternalLink size={20} />
                      </motion.div>
                    </div>

                    <p className="text-neutral-600 mb-4 leading-relaxed flex-1">{video.description}</p>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center space-x-2 text-neutral-900 hover:text-neutral-700 font-medium transition-colors duration-300 mt-auto"
                    >
                      <span>Watch Video</span>
                      <ExternalLink size={16} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-neutral-500 mb-6">Subscribe to our YouTube channel for more educational content</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="btn-secondary inline-flex items-center space-x-2">
                <span>Visit Our Channel</span>
                <ExternalLink size={16} />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default VideoContentSection
