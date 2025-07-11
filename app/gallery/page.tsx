"use client"

import { Home, X, Play } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Gallery() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleVideoClick = (videoId: number) => {
    setActiveVideo(activeVideo === videoId ? null : videoId)
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }

  // Real gallery content based on provided images
  const galleryItems = [
    {
      id: 1,
      type: "video",
      src: "https://img.youtube.com/vi/3z-Bf7_tB2g/maxresdefault.jpg",
      videoUrl: "https://youtu.be/3z-Bf7_tB2g",
      title: "STEM for ALL x NTU LPD Collaboration with Project LOVE",
      description:
        "Dr. John Heng discusses the collaboration between STEM for ALL, NTU LPD, and Project LOVE, highlighting robotics and mechatronics education at NTU.",
      speaker:
        "Dr. John Heng - Head of the Robotics and Mechatronics Programme at the School of Mechanical & Aerospace Engineering, Nanyang Technological University.",
    },
    {
      id: 2,
      type: "video",
      src: "https://img.youtube.com/vi/OKZwinw3kko/maxresdefault.jpg",
      videoUrl: "https://youtu.be/OKZwinw3kko",
      title: "STEM for All: Equitable Learning",
      description:
        "Discover how we're making STEM education accessible to every student through innovative partnerships and community outreach.",
      speaker: "Steve Tung — Child Street 11, Head Marketing & Sustainable Sponsorships",
    },
    {
      id: 3,
      type: "video",
      src: "https://img.youtube.com/vi/peewpaS8_Bg/maxresdefault.jpg",
      videoUrl: "https://youtu.be/peewpaS8_Bg",
      title: "Prof Marcelo Ang: Educational Leadership and Innovation in STEM",
      description:
        "Educational leadership and innovation in STEM, exploring cutting-edge approaches to robotics education and research collaboration.",
      speaker:
        "Prof. Marcelo Ang — Professor of Mechanical Engineering in the NUS, Director of Advance Robotics Center, President of Robotic Games Society",
    },
    {
      id: 4,
      type: "video",
      src: "https://img.youtube.com/vi/sp39XrJA0HE/maxresdefault.jpg",
      videoUrl: "https://youtu.be/sp39XrJA0HE",
      title: "Mom Don't Cry Foundation: A Story of Resilience and Hope",
      description:
        "A powerful story of resilience and hope through the Mom Don't Cry Foundation, showcasing community support and transformation.",
      speaker: "Miss YangLan — Mom Don't Cry Foundation, Chairlady",
    },
    {
      id: 5,
      type: "video",
      src: "https://img.youtube.com/vi/jwfFaKxnsGY/hqdefault.jpg",
      videoUrl: "https://youtu.be/jwfFaKxnsGY",
      title: "Child Street 11 Kids: Inspiring Journeys",
      description:
        "Follow the inspiring journeys of children from Street 11 as they discover new possibilities through STEM education and community support.",
      speaker: "Featuring children and educators from the Child Street 11 program",
    },
    {
      id: 6,
      type: "video",
      src: "https://img.youtube.com/vi/u_bBdjv48iI/maxresdefault.jpg",
      videoUrl: "https://youtu.be/u_bBdjv48iI",
      title: "STEM FOR ALL x NTU LDP Charity Drive: Robot Parade",
      description:
        "Our charity drive event at Maker Festival Regional Library Singapore, featuring an exciting robot parade and community engagement.",
      speaker:
        "In Partnership with Project Love (Nanyang Technological University Singapore School of Mechanical and Aerospace School of Engineering, Leadership Development Programme)",
    },
    {
      id: 7,
      type: "video",
      src: "https://img.youtube.com/vi/y5VDXxmRYKw/maxresdefault.jpg",
      videoUrl: "https://youtu.be/y5VDXxmRYKw",
      title: "Official Opening Speech By Dr. Sein",
      description:
        "Dr. Sein delivers the official opening speech for our charity drive collaboration with NTU Leadership Development Programme at Maker Festival 2025.",
      speaker: "Dr. Sein - Founder of STEM for ALL Charity Drive with NTU LDP 2025",
    },
  ]

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
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight leading-tight mb-8">Stories in Motion</h1>
          <p className="text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
            Watch our journey unfold through conversations with educators, innovators, and the communities we serve.
          </p>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {galleryItems.map((item) => (
              <div key={item.id} className="space-y-6">
                {/* Media Container */}
                <div className="relative aspect-video bg-neutral-200 overflow-hidden rounded-lg">
                  {activeVideo === item.id ? (
                    // Embedded Video
                    <div className="relative w-full h-full">
                      <iframe
                        src={getYouTubeEmbedUrl(item.videoUrl)}
                        title={item.title}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <button
                        onClick={() => setActiveVideo(null)}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Close video"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    // Thumbnail with Play Button
                    <div 
                      className="relative w-full h-full group cursor-pointer"
                      onClick={() => handleVideoClick(item.id)}
                    >
                      <img
                        src={item.src || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Video Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                          <Play className="w-6 h-6 text-neutral-900 ml-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl md:text-2xl font-normal tracking-wide leading-tight pr-4">{item.title}</h3>
                    <span className="text-xs uppercase tracking-wider text-neutral-500 border border-neutral-300 px-2 py-1 rounded-full whitespace-nowrap">
                      VIDEO
                    </span>
                  </div>
                  <p className="text-base leading-relaxed tracking-wide text-neutral-600">{item.description}</p>

                  {/* Speaker/Attribution */}
                  <div className="pt-2 border-t border-neutral-200">
                    <p className="text-sm text-neutral-500 leading-relaxed italic">{item.speaker}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-lg font-normal leading-relaxed tracking-wide text-neutral-600 mb-8">
            Want to be part of our story? Join us in making STEM education accessible to all.
          </p>
          <Link
            href="/contact"
            className="inline-block py-3 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg"
          >
            Get Involved
          </Link>
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
