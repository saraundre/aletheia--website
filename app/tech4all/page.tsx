"use client"

import {
  Home,
  X,
  GraduationCap,
  User,
  Settings,
  FileText,
  ArrowRight,
  Brain,
  Mic,
  Target,
  BarChart3,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

function CoreFeaturesContent() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Brain,
      title: "Emotional AI",
      description:
        "Not just smart—empathetic. Our AI recognizes frustration, celebrates breakthroughs, and adapts in real-time.",
      metric: "Highly empathetic",
      demo: "Detecting student stress levels... Adjusting pace automatically",
    },
    {
      icon: Mic,
      title: "Voice Interface",
      description: "Because not everyone learns by reading. Natural conversation in Chinese & English.",
      metric: "Bilingual: Chinese & English",
      demo: "Student: 'I don't understand fractions' → AI: 'Let's build a pizza together!'",
    },
    {
      icon: Target,
      title: "Adaptive Paths",
      description: "Every mind is unique. Every learning path should be too.",
      metric: "In Progress",
      demo: "Generating personalized curriculum for ADHD learning style...",
      status: true,
    },
    {
      icon: BarChart3,
      title: "Meaningful Analytics",
      description: "Data that serves students, not surveillance systems.",
      metric: "Privacy-first",
      demo: "Progress: +28% completion rate for neurodivergent learners",
    },
  ]

  return (
    <>
      <div className="lg:col-span-6 space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className={`cursor-pointer transition-all duration-300 border-0 rounded-lg ${
                activeFeature === index ? "bg-white shadow-lg scale-[1.02]" : "bg-white/70 hover:bg-white/90 shadow-sm"
              }`}
              onClick={() => setActiveFeature(index)}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      activeFeature === index ? "bg-neutral-100 scale-110" : "bg-neutral-50"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-neutral-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`text-lg font-medium transition-all duration-300 ${
                          activeFeature === index ? "text-neutral-900" : "text-neutral-700"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      {feature.metric && (
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            feature.title === "Adaptive Paths"
                              ? "bg-blue-100 text-blue-700"
                              : "text-neutral-500 bg-neutral-100"
                          }`}
                        >
                          {feature.metric}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-600 text-sm">{feature.description}</p>
                    <div
                      className={`h-0.5 bg-neutral-900 transition-all duration-500 rounded-full mt-3 ${
                        activeFeature === index ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden h-full">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-100 border-b border-neutral-200">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="text-sm text-neutral-500 font-medium font-mono">spark.os/demo</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-neutral-500">LIVE</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 bg-neutral-50 min-h-[400px]">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-neutral-100 rounded-lg">
                {(() => {
                  const Icon = features[activeFeature].icon
                  return <Icon className="h-6 w-6 text-neutral-700" />
                })()}
              </div>
              <div>
                <h3 className="text-lg font-medium text-neutral-900">{features[activeFeature].title}</h3>
                <div className="h-0.5 bg-neutral-900 w-full mt-1 rounded-full" />
              </div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex">
                <span className="text-blue-600">$</span>
                <span className="text-neutral-700 ml-2">
                  spark --feature {features[activeFeature].title.toLowerCase().replace(/\s+/g, "_")}
                </span>
              </div>
              <div className="text-neutral-600 ml-4">{features[activeFeature].demo}</div>
              <div className="flex items-center space-x-2 ml-4 mt-4">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600 font-medium text-sm">Feature active and running</span>
              </div>
              {/* Status/Performance section */}
              <div className="bg-neutral-100 rounded-lg p-3 ml-4 mt-4">
                <div className="text-xs text-neutral-500 mb-1">
                  {features[activeFeature].title === "Adaptive Paths" ? "Status" : "Performance"}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                  {features[activeFeature].title === "Adaptive Paths" ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded font-semibold">In Progress</span>
                      <span className="text-yellow-800 bg-yellow-200 px-2 py-1 rounded font-semibold">BETA</span>
                    </div>
                  ) : (
                    features[activeFeature].metric
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Tech4All() {
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
                  className="block text-sm md:text-3xl font-normal tracking-wide hover:opacity-70 transition-opacity px-2 py-1 rounded-lg hover:bg-neutral-100"
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
      <main className="pt-24 pb-16 md:pb-8">
        {/* Spark.OS Section */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center space-y-12">
            {/* Flagship Platform Label */}
            <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-normal tracking-wide">
              Flagship Platform
            </div>

            {/* Spark.OS Title */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-neutral-900">
              Spark.OS
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-3xl mx-auto">
              An education system designed for diverse learners. Adaptive, empathetic, and built with individual student needs at the center of every decision.
            </p>

            {/* Terminal Interface */}
            <div className="max-w-2xl mx-auto mt-16">
              <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-100 border-b border-neutral-200">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-neutral-600 font-mono">spark.os</div>
                  <div></div>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm space-y-4 bg-neutral-50">
                  <div className="text-blue-600">$ spark --status</div>
                  <div className="space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-neutral-700">Pilot launching soon</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-neutral-700">Target: +25% improvement vs traditional methods</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-neutral-700">Expanding to China, Singapore, and beyond</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-neutral-700">Emotional AI ready</span>
                    </div>
                  </div>
                  <div className="text-blue-600 mt-6">$ spark --impact neurodivergent</div>
                  <div className="ml-4 text-cyan-600">"Ready to transform learning for All students"</div>
                </div>
              </div>
            </div>

            {/* Explore Button */}
            <div className="pt-8">
              <button 
                onClick={() => window.open('https://spark-os.com/', '_blank')}
                className="inline-flex items-center space-x-2 bg-neutral-900 text-white px-8 py-4 rounded-lg hover:bg-neutral-800 transition-colors font-normal tracking-wide cursor-pointer"
              >
                <span>Explore Spark.OS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Built for Everyone Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center space-y-16">
            {/* Section Title */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-neutral-900">
                Built for Everyone
              </h2>
              <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-3xl mx-auto">
                From individual learners to global institutions, Spark.OS serves the entire educational ecosystem.
              </p>
            </div>

            {/* User Categories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Students */}
              <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mx-auto">
                  <GraduationCap className="w-6 h-6 text-neutral-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Students</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Self-directed learning with emotional support
                </p>
              </div>

              {/* Educators */}
              <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mx-auto">
                  <User className="w-6 h-6 text-neutral-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Educators</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">Tools that understand diverse minds</p>
              </div>

              {/* Administrators */}
              <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mx-auto">
                  <Settings className="w-6 h-6 text-neutral-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Administrators</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">Analytics that matter, not just metrics</p>
              </div>

              {/* Organizations */}
              <div className="bg-white p-8 rounded-lg border border-neutral-200 text-center space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-neutral-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">Organizations</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">Scalable impact for underserved communities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12 text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900 mb-6">
                Core Features
              </h2>
              <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-2xl mx-auto">
                Built with cutting-edge technology to support diverse learning needs.
              </p>
            </div>
            <CoreFeaturesContent />
          </div>
        </section>

        {/* Divider */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex justify-center">
            <div className="w-px h-24 bg-neutral-300"></div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-neutral-900">
              Ready to Transform Learning?
            </h2>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-wide text-neutral-600 max-w-2xl mx-auto">
              Join us in creating accessible, inclusive learning experiences for every student.
            </p>
            <div className="pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-neutral-900 text-white px-8 py-4 rounded-lg hover:bg-neutral-800 transition-colors font-normal tracking-wide"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-neutral-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs font-normal tracking-wide text-neutral-600">© 2024 Aletheia</div>
            <div className="flex space-x-2 text-xs font-normal tracking-wide text-neutral-600">
              <Link
                href="/stem-for-all"
                className="hover:text-neutral-900 transition-colors px-2 py-1 rounded-md hover:bg-neutral-100 text-xs md:text-sm"
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
