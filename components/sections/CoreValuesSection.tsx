'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shield, Users, Heart, Eye } from 'lucide-react'

const CoreValuesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const values = [
    {
      title: 'Ethics by Design',
      description: 'Every algorithm starts with the question: \'Who does this serve?\' We don\'t bolt on ethics as an afterthought.',
      principle: 'Core Principle: Justice over profit',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Access for All',
      description: 'Technology should be a bridge, not a wall. We build for the margins, the overlooked, the brilliant minds.',
      principle: 'Core Principle: Community over competition',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Community Driven',
      description: 'Our solutions emerge from real conversations with real communities facing real challenges.',
      principle: 'Core Principle: Purpose over performance',
      icon: Heart,
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Radical Transparency',
      description: 'Open processes, honest failures, clear communication. Transparency isn\'t just practice—it\'s revolutionary.',
      principle: 'Core Principle: Truth over convenience',
      icon: Eye,
      color: 'from-purple-500 to-violet-500'
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
    <section className="section-padding bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/10 to-accent-900/10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-2 mb-6">
              Core Values
            </h2>
            <p className="body-text text-gray-300 max-w-3xl mx-auto">
              The principles that guide every decision we make and every line of code we write.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer"
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}>
                  <value.icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="heading-3 text-white mb-4 group-hover:text-gradient transition-all duration-300">
                  {value.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {value.description}
                </p>

                {/* Principle */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm font-medium text-gradient italic">
                    {value.principle}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Bottom Message */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              These values aren't just words on a page—they're the foundation of everything we build, 
              every decision we make, and every relationship we cultivate.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CoreValuesSection 