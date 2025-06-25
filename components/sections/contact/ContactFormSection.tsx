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
      icon: Mail,
    },
    {
      title: "Pilot Programs",
      description: "Educational institution partnerships",
      icon: Users,
    },
    {
      title: "Research Collaboration",
      description: "Academic and research partnerships",
      icon: FlaskConical,
    },
  ]

  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Send Message Form */}
            <motion.div variants={itemVariants}>
              <div className="card-minimal p-8">
                <h2 className="heading-3 text-neutral-900 mb-8">Send Message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name and Organization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all duration-300 ${
                          errors.name ? "border-red-300" : "border-neutral-200 focus:border-neutral-400"
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-neutral-700 mb-2">
                        Organization
                      </label>
                      <input
                        {...register("organization")}
                        type="text"
                        id="organization"
                        placeholder="Your organization"
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all duration-300 ${
                        errors.email ? "border-red-300" : "border-neutral-200 focus:border-neutral-400"
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                  </div>

                  {/* Interest Area */}
                  <div>
                    <label htmlFor="interestArea" className="block text-sm font-medium text-neutral-700 mb-2">
                      Interest Area
                    </label>
                    <select
                      {...register("interestArea")}
                      id="interestArea"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all duration-300 ${
                        errors.interestArea ? "border-red-300" : "border-neutral-200 focus:border-neutral-400"
                      }`}
                    >
                      <option value="">Select your area of interest</option>
                      {interestAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    {errors.interestArea && <p className="mt-1 text-sm text-red-600">{errors.interestArea.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      rows={6}
                      placeholder="Tell us about your project, organization, or how you'd like to collaborate..."
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all duration-300 resize-none ${
                        errors.message ? "border-red-300" : "border-neutral-200 focus:border-neutral-400"
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full btn-primary flex items-center justify-center space-x-2 ${
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
                        <Send size={18} />
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
                    className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                  >
                    <CheckCircle size={20} className="text-green-600" />
                    <p className="text-green-800">
                      Thank you! Your message has been sent successfully. We'll get back to you within 24-48 hours.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Direct Contact */}
            <motion.div variants={itemVariants}>
              <div className="space-y-8">
                <div>
                  <h2 className="heading-3 text-neutral-900 mb-8">Direct Contact</h2>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="card-minimal p-6 group cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center group-hover:bg-neutral-200 transition-colors duration-300">
                          <info.icon size={20} className="text-neutral-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 mb-1">{info.title}</h3>
                          <p className="text-sm text-neutral-600 mb-0">{info.description}</p>
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
                  className="card-minimal p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center">
                      <Clock size={20} className="text-neutral-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Response Time</h3>
                      <p className="text-sm text-neutral-600 mb-3">
                        We typically respond within <span className="font-medium text-neutral-900">24-48 hours</span>.
                        For urgent matters, mention "URGENT" in your subject.
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-neutral-500">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
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
