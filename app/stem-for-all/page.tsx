"use client"

import { Home, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function StemForAll() {
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
            <Link href="/" className="text-sm font-normal tracking-wide hover:opacity-70 transition-opacity">
              Aletheia
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
      <main className="pt-24">
        {/* Section 1 - John Lennon Quote (First) */}
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-8">
            {/* Main Quote */}
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-normal leading-relaxed tracking-wide text-neutral-700">
                You may say I'm a dreamer
              </p>
              <p className="text-xl md:text-2xl font-normal leading-relaxed tracking-wide text-neutral-700">
                But I'm not the only one
              </p>
              <p className="text-xl md:text-2xl font-normal leading-relaxed tracking-wide text-neutral-700">
                I hope someday you'll join us
              </p>
              <p className="text-xl md:text-2xl font-normal leading-relaxed tracking-wide text-neutral-700">
                And the world will be as one
              </p>
            </div>

            {/* Song Title */}
            <div className="pt-8 space-y-2">
              <p className="text-lg font-normal tracking-wide text-neutral-600">"Imagine"</p>
              <p className="text-lg font-normal italic tracking-wide text-neutral-500">Imagine</p>
            </div>

            {/* Attribution */}
            <div className="pt-8 border-t border-neutral-200">
              <p className="text-base font-normal tracking-wide text-neutral-600">John Lennon, 1971</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Hero Section (Second) */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-8">
            {/* Educational Technology Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-normal tracking-wide text-neutral-600">Educational Technology</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-neutral-900">
              STEM for All
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-wide leading-relaxed text-neutral-600 mt-6">
              Equitable Learning
              <br />
              Opportunities
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-2xl mx-auto mt-8">
              Creating accessible, inclusive learning experiences that reach every student, regardless of background or
              ability.
            </p>

            {/* Divider */}
            <div className="flex justify-center mt-12">
              <div className="w-24 h-px bg-neutral-300"></div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Join the Movement Section */}
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-neutral-900">
              Join the Movement
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600">
              Ready to make STEM education accessible to all? Partner with us to create equitable learning
              opportunities.
            </p>
            <div className="pt-8">
              <Link
                href="/contact"
                className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-neutral-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm font-normal tracking-wide text-neutral-600">© 2024 Aletheia</div>
            <div className="flex space-x-8 text-sm font-normal tracking-wide text-neutral-600">
              <Link
                href="/stem-for-all"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                Stem for All
              </Link>
              <Link
                href="/tech-for-good"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                Tech4All
              </Link>
              <Link
                href="/about"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="hover:text-neutral-900 transition-colors px-3 py-1 rounded-md hover:bg-neutral-100"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
