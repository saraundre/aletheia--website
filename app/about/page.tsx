"use client"

import { Home, X } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

function CollaboratorsCarousel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const collaborators = [
    {
      name: "Science Centre Singapore",
      image: "/partners/science-centre-singapore.png"
    },
    {
      name: "National Library Board",
      image: "/partners/national-library-board-singapore.jpg"
    },
    {
      name: "Rakuten Asia",
      image: "/partners/rakuten-asia.svg"
    },
    {
      name: "Child Street 11",
      image: "/partners/child-at-street-11.png"
    },
    {
      name: "Mom Don't Cry Foundation",
      image: "/partners/mom-dont-cry-foundation.svg"
    },
    {
      name: "National University Singapore",
      image: "/partners/national-university-singapore.png"
    },
    {
      name: "MakeIT at Libraries",
      image: "/partners/MakeIT-at-Libraries.png"
    },
    {
      name: "Robotic Games Society Singapore",
      image: "/partners/robotic-games-society-singapore.svg"
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-16 bg-neutral-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="w-12 h-px bg-neutral-300 mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-neutral-900 mb-8">
              Trusted by
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-2xl mx-auto">
              leading organisations for impact.
            </p>
          </motion.div>

          {/* Carousel Container */}
          <motion.div variants={itemVariants} className="relative overflow-hidden">
            {/* First Row - Moving Right */}
            <div className="flex space-x-8 mb-8 animate-scroll-right">
              {[...collaborators, ...collaborators].map((collaborator, index) => (
                <motion.div
                  key={`row1-${collaborator.name}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow px-4 py-4 min-w-[280px] text-center group">
                    <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mx-auto group-hover:bg-neutral-50 transition-colors duration-300">
                      <Image
                        src={collaborator.image}
                        alt={`${collaborator.name} logo`}
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Row - Moving Left */}
            <div className="flex space-x-8 animate-scroll-left">
              {[...collaborators.slice().reverse(), ...collaborators.slice().reverse()].map((collaborator, index) => (
                <motion.div
                  key={`row2-${collaborator.name}-${index}`}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0"
                >
                  <div className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow px-4 py-4 min-w-[280px] text-center group">
                    <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mx-auto group-hover:bg-neutral-50 transition-colors duration-300">
                      <Image
                        src={collaborator.image}
                        alt={`${collaborator.name} logo`}
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        
        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }
        
        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 32; // px from bottom
      if (window.innerWidth < 768) {
        setShowFooter(window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stem for All
                </Link>
                <Link
                  href="/tech4all"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tech4All
                </Link>
                <Link
                  href="/about"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/gallery"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
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
      <main className="pb-16 md:pb-8">


        {/* About Aletheia */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="flex flex-col items-center space-y-8 w-full">
            <div className="w-64 h-64 flex items-center justify-center">
              <Image
                src="/aletheia_logo.png"
                alt="Aletheia Logo"
                width={256}
                height={256}
                className="object-contain"
              />
            </div>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600">
              Aletheia is a multi-channel communications firm<br />
              with full stack event management and broadcast capabilities.<br />
              We focus on technology, nonprofit, and sustainability.
            </p>
            <div>
              <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 italic mb-4">
                For Sentience,
              </p>
              <div className="flex justify-center">
                <div className="w-48 h-24 flex items-center justify-center">
                  <Image
                    src="/aletheia_signature.svg"
                    alt="Aletheia Signature"
                    width={192}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Animated Collaborators Carousel */}
        <CollaboratorsCarousel />

        {/* Our Approach */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center space-y-12">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight leading-tight text-neutral-900">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Authentic Innovation</h3>
                <p className="text-base leading-relaxed tracking-wide text-neutral-600">
                  We solve business problems by tailoring solutions based on a mix of strategy, content, and unique
                  proposition. No communications white noise. No BS.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Standalone Spirit</h3>
                <p className="text-base leading-relaxed tracking-wide text-neutral-600">
                  Our courage to be different allows us to see opportunities others miss and create solutions that truly matter. We stand alone by choice.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Community-Centered</h3>
                <p className="text-base leading-relaxed tracking-wide text-neutral-600">
                  Every initiative we undertake is designed with real students, real educators, and real communities at
                  its heart. Impact isn't just measured—it's lived.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900">Closing Loops</h3>
                <p className="text-base leading-relaxed tracking-wide text-neutral-600">
                  Through partnerships with leading institutions and organizations, we amplify our reach and deepen our
                  impact, creating sustainable change that lasts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-2xl mx-auto px-6 py-16 pb-32 text-center">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight leading-tight text-neutral-900">
              Let’s Make Impact Together.
            </h2>
            <Link
              href="/contact"
              className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg"
            >
              Get in Touch.
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`fixed bottom-0 left-0 right-0 bg-neutral-50/80 backdrop-blur-sm ${showFooter ? '' : 'hidden'} md:block`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs font-normal tracking-wide text-neutral-600">© 2024 Aletheia</div>
            <div className="flex space-x-2 text-xs font-normal tracking-wide text-neutral-600">
              <a href="/stem-for-all" className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 text-xs md:text-sm">Stem for All</a>
              <a href="/tech4all" className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 text-xs md:text-sm">Tech4All</a>
              <a href="/about" className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 text-xs md:text-sm">About</a>
              <a href="/gallery" className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 text-xs md:text-sm">Gallery</a>
              <a href="/contact" className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 text-xs md:text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
