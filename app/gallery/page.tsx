"use client"

import { X, Play } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function Gallery() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  const handleVideoClick = (videoId: number) => {
    setActiveVideo(activeVideo === videoId ? null : videoId)
  }

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = ''
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0]
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0]
    } else {
      videoId = url.split('/').pop() || ''
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  }

  const getImagePath = (path: string) => {
    const lastSlashIndex = path.lastIndexOf('/')
    if (lastSlashIndex === -1) {
      return encodeURIComponent(path)
    }
    const dirPath = path.substring(0, lastSlashIndex + 1)
    const filename = path.substring(lastSlashIndex + 1)
    return dirPath + encodeURIComponent(filename)
  }

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
      speaker: "Steve Tung — Child at Street 11, Head Marketing & Sustainable Sponsorships",
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
      title: "Child at Street 11 Kids: Inspiring Journeys",
      description:
        "Follow the inspiring journeys of children from Street 11 as they discover new possibilities through STEM education and community support.",
      speaker: "Featuring children and educators from the Child at Street 11 program",
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
    {
      id: 8,
      type: "photo",
      src: "/gallery/photos/events/STEM for All x Maker Festival 2024.jpg",
      title: "Suncare: Engaging with Scratch",
      description:
        "Learning through play, where the workshop merges block-based programming with imaginative, creative thinking to spark curiosity and confidence in every learner.",
      speaker: "STEM for All Team and Community Partners",
    },
    {
      id: 9,
      type: "photo",
      src: "/gallery/photos/events/STEM for All x Maker Festival 2024 (2).JPG",
      title: "Maker Festival 2024 - Interactive Workshops",
      description:
        "Students and educators participating in hands-on STEM workshops, demonstrating the practical application of robotics and technology education.",
      speaker: "Workshop Participants and STEM Educators",
    },
    {
      id: 10,
      type: "photo",
      src: "/gallery/photos/events/STEM for All x Maker Festival 2024 (3).JPG",
      title: "Community Engagement at Maker Festival 2024",
      description:
        "Community members exploring our STEM exhibits and learning about the impact of technology education on youth development.",
      speaker: "Community Members and STEM for All Volunteers",
    },
    {
      id: 11,
      type: "photo",
      src: "/gallery/photos/events/STEM for All x Maker Festival 2024 (4).jpg",
      title: "Maker Festival 2024 - Closing Celebration",
      description:
        "The successful conclusion of our Maker Festival 2024 collaboration, celebrating the achievements and connections made during the event.",
      speaker: "All Participants and Organizers",
    },
    {
      id: 12,
      type: "video",
      src: "https://img.youtube.com/vi/EoqljUsniQg/hqdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=EoqljUsniQg",
      title: "In Conversation with Sparkie",
      description:
        "See the twinkle in their eyes as Sparkie turns simple questions into a luminous journey of curiosity, insight, and discovery.",
      speaker: "STEM for All Team and Community Participants",
    },
    {
      id: 13,
      type: "photo",
      src: "/gallery/photos/events/SparkOS x Ugly duck school Yunan\u00A02025.jpg",
      title: "STEM for All x SparkOS Trailblazing in China, Yunnan. 2025",
      description:
        "STEM for All x SparkOS is on a mission to create a global community, one relationship at a time. We are on track to make a difference for neurodivergent, under resourced and minority communities. A collaboration with Ugly Duckling School, Yunnan.",
      speaker: "STEM for All x SparkOS Team and Ugly Duckling School, Yunnan",
    },
    {
      id: 14,
      type: "photo",
      src: "/gallery/photos/events/SparkOS x Yuegu Foshan\u00A02025.jpg",
      title: "STEM for All x SparkOS Kiai in China, Foshan. 2025",
      description:
        "STEM for All x SparkOS at community spaces for good. Designed to foster social connections, provide skill training and ensure sustainable community empowerment. A collaboration with Yuegu, Foshan.",
      speaker: "STEM for All x SparkOS Team and Yuegu, Foshan",
    },
    {
      id: 15,
      type: "photo",
      src: "/gallery/photos/events/SparkOS x STEM for All x Maker Festival 2025 Guangzhou.jpg.jpg",
      title: "SparkOS Team at Maker Faire 2025, Guangzhou",
      description:
        "STEM for All at Maker Faire 2025, Guangzhou to share about inclusivity, equitable quality education and learning opportunities for all.",
      speaker: "STEM for All Team at Maker Faire 2025, Guangzhou",
    },
    {
      id: 16,
      type: "photo",
      src: "/gallery/photos/events/SparkOS x Beijing\u00A02025.jpg",
      title: "STEM for All x SparkOS at China, Beijing. 2025",
      description:
        "\"Individually, we are one drop. Together, we are an ocean\", says Ryunosuke Satoro. STEM for All x SparkOS is part of United Nations Sustainable Development Goals to create an immense and powerful impact for people and planet (animals included). A collaboration with Zhengxin, Beijing.",
      speaker: "STEM for All x SparkOS Team and Zhengxin, Beijing",
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-serif flex flex-col">
      <Nav />

      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-normal tracking-tight leading-tight mb-8">Stories in Motion</h1>
          <p className="text-lg font-normal leading-relaxed tracking-wide text-neutral-600">
            Watch our journey unfold through conversations with educators, innovators, and the communities we serve. Explore our photo gallery capturing memorable moments from events and workshops.
          </p>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {galleryItems.map((item) => (
              <div key={item.id} className="space-y-6">
                {/* Media Container */}
                <div className="relative aspect-video bg-neutral-200 overflow-hidden rounded-lg">
                  {item.type === "video" && activeVideo === item.id && item.videoUrl ? (
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
                  ) : item.type === "video" ? (
                    <div
                      className="relative w-full h-full group cursor-pointer"
                      onClick={() => handleVideoClick(item.id)}
                    >
                      <img
                        src={item.src || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e5e5' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23999'%3EImage Loading...%3C/text%3E%3C/svg%3E"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e5e5' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23666'%3EImage Coming Soon%3C/text%3E%3C/svg%3E";
                          if (!target.src.includes('data:image/svg+xml')) {
                            target.src = placeholder;
                          }
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                          <Play className="w-6 h-6 text-neutral-900 ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full group">
                      <img
                        src={item.src ? getImagePath(item.src) : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e5e5' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23999'%3EImage Loading...%3C/text%3E%3C/svg%3E"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e5e5' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23666'%3EImage Coming Soon%3C/text%3E%3C/svg%3E";
                          if (!target.src.includes('data:image/svg+xml')) {
                            target.src = placeholder;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl md:text-2xl font-normal tracking-wide leading-tight pr-4">{item.title}</h3>
                    <span className="text-xs uppercase tracking-wider text-neutral-500 border border-neutral-300 px-2 py-1 rounded-full whitespace-nowrap">
                      {item.type === "video" ? "VIDEO" : "PHOTO"}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed tracking-wide text-neutral-600">{item.description}</p>

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
        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
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

      <Footer />
    </div>
  )
}
