"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

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
      name: "Child at Street 11",
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
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif flex flex-col">
      <Nav />

      <main className="flex-1 pt-24">
        {/* About Aletheia */}
        <section className="px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl mx-auto text-center space-y-8 md:space-y-10"
          >
            <div className="space-y-4">
              <p className="text-xs md:text-sm font-medium tracking-[0.24em] uppercase text-neutral-500">
                About Aletheia
              </p>
              <div className="w-14 h-px bg-neutral-300 mx-auto" />
            </div>

            <div className="w-44 h-20 md:w-52 md:h-24 flex items-center justify-center mx-auto">
              <Image
                src="/aletheia_logo.png"
                alt="Aletheia Logo"
                width={208}
                height={96}
                className="object-contain"
              />
            </div>

            <p className="text-lg md:text-2xl font-normal leading-relaxed tracking-normal text-neutral-700 max-w-4xl mx-auto">
              Aletheia is a government-aligned, research-driven EdTech ecosystem integrating national STEM education, university R&amp;D, charitable impact programmes, and innovation initiatives. We operate as both a technology implementation partner and a national ecosystem enabler&mdash;aligning public institutions, academia, and industry to advance scalable, sustainable innovation.
            </p>

            <div className="pt-2 space-y-4">
              <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 italic">
                For Sentience,
              </p>
              <div className="flex justify-center">
                <div className="w-40 h-16 md:w-48 md:h-20 flex items-center justify-center">
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
          </motion.div>
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
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-7 text-left">
              <div className="space-y-4 border border-neutral-200 rounded-xl bg-white/85 p-6 md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Authentic Innovation</h3>
                <p className="text-lg leading-relaxed tracking-normal text-neutral-700">
                  We solve business problems by tailoring solutions based on a mix of strategy, content, and unique
                  proposition. No communications white noise. No BS.
                </p>
              </div>
              <div className="space-y-4 border border-neutral-200 rounded-xl bg-white/85 p-6 md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Standalone Spirit</h3>
                <p className="text-lg leading-relaxed tracking-normal text-neutral-700">
                  Our courage to be different allows us to see opportunities others miss and create solutions that truly matter. We stand alone by choice.
                </p>
              </div>
              <div className="space-y-4 border border-neutral-200 rounded-xl bg-white/85 p-6 md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Community-Centered</h3>
                <p className="text-lg leading-relaxed tracking-normal text-neutral-700">
                  Every initiative we undertake is designed with real students, real educators, and real communities at
                  its heart. Impact isn&apos;t just measured&mdash;it&apos;s lived.
                </p>
              </div>
              <div className="space-y-4 border border-neutral-200 rounded-xl bg-white/85 p-6 md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">Closing Loops</h3>
                <p className="text-lg leading-relaxed tracking-normal text-neutral-700">
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
        <section className="max-w-2xl mx-auto px-6 py-16 pb-24 text-center">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight leading-tight text-neutral-900">
              Let&apos;s Make Impact Together.
            </h2>
            <Link
              href="/contact"
              className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
            >
              Get in Touch.
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
