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
    },
    {
      title: "Access for All",
      description:
        "Technology should be a bridge, not a wall. We build for the margins, the overlooked, the brilliant minds.",
      principle: "Core Principle: Community over competition",
      icon: Users,
    },
    {
      title: "Community Driven",
      description: "Our solutions emerge from real conversations with real communities facing real challenges.",
      principle: "Core Principle: Purpose over performance",
      icon: Heart,
    },
    {
      title: "Radical Transparency",
      description:
        "Open processes, honest failures, clear communication. Transparency isn't just practice—it's revolutionary.",
      principle: "Core Principle: Truth over convenience",
      icon: Eye,
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
    <section className="section-padding bg-slate-50">
      <div className="grid-minimal">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="col-span-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-lg mb-6">Core Values</h2>
            <p className="body-lg text-slate-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every line of code we write.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <div className="card-minimal h-full">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="h-6 w-6 text-slate-700" />
                  </div>

                  {/* Content */}
                  <h3 className="heading-3 text-slate-900 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {value.title}
                  </h3>

                  <p className="text-slate-600 mb-6 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Principle */}
                  <div className="border-t border-slate-200 pt-4 group-hover:border-slate-300 transition-colors duration-300">
                    <p className="text-sm font-medium text-slate-500 group-hover:text-slate-600 italic transition-colors duration-300">
                      {value.principle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Message */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="max-w-4xl mx-auto">
              <p className="body-lg text-slate-600 leading-relaxed">
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
