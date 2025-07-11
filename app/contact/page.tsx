"use client"

import { Home, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/aletheia_logo.png"
                alt="Aletheia Logo"
                width={100}
                height={32}
                className="object-contain"
              />
            </Link>
            <button onClick={toggleMenu} className="hover:opacity-70 transition-opacity" aria-label="Toggle menu">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Home className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-50/95 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-8">
              <nav className="space-y-6">
                <Link
                  href="/stem-for-all"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stem for All
                </Link>
                <Link
                  href="/tech-for-good"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tech4All
                </Link>
                <Link
                  href="/about"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/gallery"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/contact"
                  className="block text-2xl md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-24 pb-32">
        {/* Header Section */}
        <section className="max-w-2xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight leading-tight mb-8">Get In Touch</h1>
          <p className="text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
            Ready to collaborate or just looking to find out more? We'd love to hear from you.
          </p>
        </section>

        {/* Contact Form */}
        <section className="max-w-lg mx-auto px-6">
          <form className="space-y-8">
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg rounded-lg"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg rounded-lg"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg rounded-lg"
                />
              </div>

              <div>
                <select
                  name="interest"
                  required
                  className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg appearance-none cursor-pointer rounded-lg"
                >
                  <option value="">Interest Area</option>
                  <option value="pilot-program">Pilot Program</option>
                  <option value="partnership">Partnership</option>
                  <option value="research-collaboration">Research Collaboration</option>
                  <option value="funding-opportunity">Funding Opportunity</option>
                  <option value="join-team">Join Our Team</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message"
                  required
                  className="w-full px-4 py-4 border border-neutral-300 bg-transparent text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-neutral-900 transition-colors font-serif text-lg resize-none rounded-lg"
                />
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full py-4 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Response Time Note */}
          <div className="text-center mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500 tracking-wide">We typically respond within 24-48 hours</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-neutral-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm font-normal tracking-wide text-neutral-600">© 2024 Aletheia</div>
            <div className="flex space-x-8 text-sm font-normal tracking-wide text-neutral-600">
              <Link href="/stem-for-all" className="hover:text-neutral-900 transition-colors">
                Stem for All
              </Link>
              <Link href="/tech-for-good" className="hover:text-neutral-900 transition-colors">
                Tech4All
              </Link>
              <Link href="/about" className="hover:text-neutral-900 transition-colors">
                About
              </Link>
              <Link href="/gallery" className="hover:text-neutral-900 transition-colors">
                Gallery
              </Link>
              <Link href="/contact" className="hover:text-neutral-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
