"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Shield, Users, Heart, Eye } from "lucide-react"

const CoreValuesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const values = [
    {
      title: "Ethics by Design",
      description:
        "Every algorithm starts with the question: 'Who does this serve?' We don't bolt on ethics as an afterthought.",
      principle: "Core Principle: Justice over profit",
      icon: Shield,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "from-blue-500 to-cyan-500",
    },
    {
      title: "Access for All",
      description:
        "Technology should be a bridge, not a wall. We build for the margins, the overlooked, the brilliant minds.",
      principle: "Core Principle: Community over competition",
      icon: Users,
      gradient: "from-green-500/20 to-emerald-500/20",
      iconBg: "from-green-500 to-emerald-500",
    },
    {
      title: "Community Driven",
      description: "Our solutions emerge from real conversations with real communities facing real challenges.",
      principle: "Core Principle: Purpose over performance",
      icon: Heart,
      gradient: "from-pink-500/20 to-rose-500/20",
      iconBg: "from-pink-500 to-rose-500",
    },
    {
      title: "Radical Transparency",
      description:
        "Open processes, honest failures, clear communication. Transparency isn't just practice—it's revolutionary.",
      principle: "Core Principle: Truth over convenience",
      icon: Eye,
      gradient: "from-purple-500/20 to-violet-500/20",
      iconBg: "from-purple-500 to-violet-500",
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
    <section className="section-padding bg-neutral-900 text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
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
            <div className="w-12 h-px bg-white/30 mx-auto mb-8" />
            <h2 className="heading-2 mb-6 text-white">Core Values</h2>
            <p className="body-text text-white/70 max-w-3xl mx-auto">
              The principles that guide every decision we make and every line of code we write.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="group relative"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500`}
                />

                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-white/10 transition-all duration-300`}
                  >
                    <value.icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="heading-3 text-white mb-4 group-hover:text-white/95 transition-colors duration-300">
                    {value.title}
                  </h3>

                  <p className="text-white/70 mb-6 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Principle */}
                  <div className="border-t border-white/10 group-hover:border-white/20 pt-4 transition-colors duration-300">
                    <p className="text-sm font-medium text-white/60 group-hover:text-white/70 italic transition-colors duration-300">
                      {value.principle}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Message */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="max-w-4xl mx-auto">
              <div className="w-24 h-px bg-white/30 mx-auto mb-8" />
              <p className="text-xl text-white/80 leading-relaxed">
                These values aren't just words on a page—they're the foundation of everything we build, every decision
                we make, and every relationship we cultivate.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CoreValuesSection
