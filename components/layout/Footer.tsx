'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, MapPin, Github, Twitter, Linkedin, Send } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your newsletter service
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/aletheia', color: 'hover:text-gray-700' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/aletheia', color: 'hover:text-blue-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/aletheia', color: 'hover:text-blue-700' },
  ]

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-neutral-50 text-slate-900 border-t border-slate-200"
    >
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/founder/aletheia-logo.png"
                  alt="Aletheia"
                  width={180}
                  height={48}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Building research technologies that solve real-world problems. 
                Truth in tech, action in society.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-700 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-slate-900">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail size={20} className="text-slate-500 mt-1 flex-shrink-0" />
                  <div>
                    <a 
                      href="mailto:enquiry@aletheia.sg"
                      className="text-slate-700 hover:text-slate-900 transition-colors duration-300"
                    >
                      enquiry@aletheia.sg
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-slate-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-700">Singapore & Global</p>
                    <p className="text-slate-500 text-sm">Building for communities worldwide</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-slate-900">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Contact', href: '/contact' },
                ].map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-slate-700 hover:text-slate-900 transition-colors duration-300 block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-slate-900">Stay Updated</h4>
              <p className="text-slate-500 mb-6">
                Get updates on our latest research and impact.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 rounded-lg bg-slate-900 text-white font-semibold shadow-none hover:bg-slate-700 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </form>
              
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-sm mt-2"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-slate-200 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2025 Aletheia Collective. Building with purpose.
            </p>
            <p className="text-slate-400 text-sm">
              No cookies, no tracking, just truth.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer 