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
      url: "https://www.youtube.com/watch?v=OKZwinw3kko&t=62s",
      info: "Steve Tung — Child Street 11, Head Marketing & Sustainable Sponsorships",
    },
    {
      title: "Prof Marcelo Ang",
      description: "Educational leadership and innovation in STEM",
      duration: "8:15",
      url: "https://www.youtube.com/watch?v=peewpaS8_Bg",
      info: "Prof. Marcelo Ang — Professor of Mechanical Engineering in the NUS, Director of Advance Robotics Center, President of Robotic Games Society",
    },
    {
      title: "Mom don't Cry Foundation",
      description: "A story of resilience and hope through the Mom don't Cry Foundation.",
      duration: "Unknown",
      url: "https://youtu.be/sp39XrJA0HE",
      info: "Miss YangLan — Mom don't Cry Foundation, Chairlady",
    },
    {
      title: "Child street 11 kids",
      description: "Inspiring journeys of the children from Street 11.",
      duration: "Unknown",
      url: "https://youtu.be/jwfFaKxnsGY",
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
            {videos.map((video, index) => {
              // Robust YouTube embed URL conversion
              let embedUrl = video.url;
              const ytMatch =
                embedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/) || [];
              const videoId = ytMatch[1];
              let start = '';
              // Handle start time in URL
              const tMatch = embedUrl.match(/[?&]t=(\d+)s?/);
              if (tMatch) {
                start = `?start=${tMatch[1]}`;
              }
              if (videoId) {
                embedUrl = `https://www.youtube.com/embed/${videoId}${start}`;
              }
              return (
                <motion.div
                  key={video.title}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className="h-full"
                >
                  <div className="card-minimal overflow-hidden h-full flex flex-col">
                    {/* Embedded YouTube Video */}
                    <div className="relative h-64 overflow-hidden flex-shrink-0">
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
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
                      {video.info && (
                        <p className="text-neutral-500 text-sm mb-2">{video.info}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VideoContentSection
