'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Clock, Shield } from 'lucide-react'

const ContactInfoSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const contactInfo = [
    {
      title: 'General Inquiries',
      description: 'For partnerships and collaborations',
      email: 'enquiry@aletheia.sg',
      icon: Mail
    },
    {
      title: 'Pilot Programs',
      description: 'Educational institution partnerships',
      email: 'pilots@aletheia.sg',
      icon: Mail
    },
    {
      title: 'Research Collaboration',
      description: 'Academic and research partnerships',
      email: 'research@aletheia.sg',
      icon: Mail
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
    <section className="section-padding bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
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
              Direct Contact
            </h2>
            <p className="body-text text-dark-600 max-w-3xl mx-auto">
              Get in touch with the right team for your specific needs. 
              We're here to help you find the best way to collaborate.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="card p-8 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                  <info.icon size={28} className="text-white" />
                </div>
                
                <h3 className="heading-3 text-dark-900 mb-4">
                  {info.title}
                </h3>
                
                <p className="text-dark-600 mb-6 leading-relaxed">
                  {info.description}
                </p>
                
                <a
                  href={`mailto:${info.email}`}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300 group-hover:underline"
                >
                  {info.email}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Response Time Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Clock size={24} className="text-white" />
                  </div>
                  <h3 className="heading-3 text-dark-900">
                    Response Time
                  </h3>
                </div>
                
                <p className="text-dark-600 mb-4 leading-relaxed">
                  We typically respond within <span className="font-semibold text-primary-600">24-48 hours</span>. 
                  For urgent matters, mention "URGENT" in your subject line.
                </p>
                
                <div className="flex items-center space-x-2 text-sm text-dark-500">
                  <Shield size={16} />
                  <span>No spam, just honest communication</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6">
                <h4 className="font-semibold text-dark-900 mb-4">
                  What to expect:
                </h4>
                <ul className="space-y-3 text-dark-600">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Personal response from our team</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Detailed discussion of your needs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Clear next steps and timeline</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Ongoing support throughout the process</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Bottom Message */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <p className="text-dark-500 text-lg">
              Ready to start a conversation? We're excited to hear from you.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactInfoSection 