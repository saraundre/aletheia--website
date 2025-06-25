"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Send, CheckCircle, Mail, Clock, Users, FlaskConical } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  interestArea: z.enum([
    "Pilot Program",
    "Partnership",
    "Funding Opportunity",
    "Research Collaboration",
    "Join Our Team",
    "Other",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactFormSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form data:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()

    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const interestAreas = [
    "Pilot Program",
    "Partnership",
    "Funding Opportunity",
    "Research Collaboration",
    "Join Our Team",
    "Other",
  ]

  const contactInfo = [
    {
      title: "General Inquiries",
      description: "For partnerships and collaborations",
      email: "enquiry@aletheia.sg",
      icon: Mail,
    },
    {
      title: "Pilot Programs",
      description: "Educational institution partnerships",
      email: "pilots@aletheia.sg",
      icon: Users,
    },
    {
      title: "Research Collaboration",
      description: "Academic and research partnerships",
      email: "research@aletheia.sg",
      icon: FlaskConical,
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Ready to collaborate or just looking to find out more? We'd love to hear from you. Send us a message and we'll respond within 24-48 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/5">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">
                  Send Message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                  {/* Name and Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                        Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className={`w-full px-4 py-3 sm:py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-900 placeholder-slate-400 ${
                          errors.name ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                        }`}
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-semibold text-slate-700 mb-2">
                        Organization
                      </label>
                      <input
                        {...register("organization")}
                        type="text"
                        id="organization"
                        placeholder="Your organization"
                        className="w-full px-4 py-3 sm:py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-900 placeholder-slate-400 hover:border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 sm:py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-900 placeholder-slate-400 ${
                        errors.email ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                  </div>

                  {/* Interest Area */}
                  <div>
                    <label htmlFor="interestArea" className="block text-sm font-semibold text-slate-700 mb-2">
                      Interest Area *
                    </label>
                    <select
                      {...register("interestArea")}
                      id="interestArea"
                      className={`w-full px-4 py-3 sm:py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-900 ${
                        errors.interestArea ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <option value="">Select your area of interest</option>
                      {interestAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.interestArea && <p className="mt-2 text-sm text-red-600">{errors.interestArea.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={6}
                      placeholder="Tell us about your project, organization, or how you'd like to collaborate..."
                      className={`w-full px-4 py-3 sm:py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-slate-900 placeholder-slate-400 ${
                        errors.message ? "border-red-300 bg-red-50" : "border-slate-200 hover:border-slate-300"
                      }`}
                    />
                    {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 sm:py-5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-slate-900/25 hover:shadow-xl hover:shadow-slate-900/30 ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Success Message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-3"
                  >
                    <CheckCircle size={20} className="text-emerald-600" />
                    <p className="text-emerald-800 font-medium">
                      Thank you! Your message has been sent successfully. We'll get back to you within 24-48 hours.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8">
                    Direct Contact
                  </h2>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-300">
                          <info.icon size={20} className="text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-2">{info.title}</h3>
                          <p className="text-sm text-slate-600 mb-3 leading-relaxed">{info.description}</p>
                          <a
                            href={`mailto:${info.email}`}
                            className="text-slate-900 font-medium hover:text-blue-600 transition-colors duration-300"
                          >
                            {info.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Response Time */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-lg shadow-slate-900/5"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Clock size={20} className="text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">Response Time</h3>
                      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                        We typically respond within <span className="font-semibold text-slate-900">24-48 hours</span>.
                        For urgent matters, mention "URGENT" in your subject.
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                        <span>No spam, just honest communication</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactFormSection
