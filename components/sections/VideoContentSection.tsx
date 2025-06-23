'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, ExternalLink } from 'lucide-react'

const VideoContentSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const videos = [
    {
      title: 'STEM for All: Equitable Learning',
      description: 'Discover how we\'re making STEM education accessible to every student',
      thumbnail: '/api/placeholder/400/250',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      duration: '5:32'
    },
    {
      title: 'Prof Marcelo Ang',
      description: 'Educational leadership and innovation in STEM',
      thumbnail: '/api/placeholder/400/250',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      duration: '8:15'
    }
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
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
            <h2 className="heading-2 text-dark-900 mb-6">
              Video Content
            </h2>
            <p className="body-text text-dark-600 max-w-3xl mx-auto">
              Explore our latest videos showcasing our commitment to equitable STEM education 
              and innovative learning approaches.
            </p>
          </motion.div>

          {/* Video Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.title}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="card overflow-hidden group cursor-pointer"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-accent-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-all duration-300"
                    >
                      <Play size={24} className="text-primary-600 ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="heading-3 text-dark-900 group-hover:text-primary-600 transition-colors duration-300">
                      {video.title}
                    </h3>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ExternalLink size={20} />
                    </motion.div>
                  </div>
                  
                  <p className="text-dark-600 mb-4 leading-relaxed">
                    {video.description}
                  </p>

                  <motion.a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
                  >
                    <span>Watch Video</span>
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <p className="text-dark-500 mb-6">
              Subscribe to our YouTube channel for more educational content
            </p>
            <motion.a
              href="https://youtube.com/@aletheia"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>Visit Our Channel</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default VideoContentSection 