"use client"
import React, { useState } from "react"
import { Brain, Mic, Target, BarChart3, CheckCircle } from 'lucide-react'

const CoreFeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Brain,
      title: "Emotional AI",
      description: "Not just smart—empathetic. Our AI recognizes frustration, celebrates breakthroughs, and adapts in real-time.",
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
    <section className="section-padding">
      <div className="grid-minimal">
        <div className="col-span-12 text-center mb-16">
          <h2 className="heading-lg mb-6">Core Features</h2>
          <p className="body-lg text-slate-600 max-w-2xl mx-auto">
            Built with cutting-edge technology to support diverse learning needs.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-6 space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-all duration-300 border-0 rounded-lg ${
                activeFeature === index 
                  ? "bg-white shadow-lg scale-[1.02]" 
                  : "bg-white/70 hover:bg-white/90 shadow-sm"
              }`}
              onClick={() => setActiveFeature(index)}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg transition-all duration-300 ${
                    activeFeature === index ? "bg-slate-100 scale-110" : "bg-slate-50"
                  }`}>
                    <feature.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-medium transition-all duration-300 ${
                        activeFeature === index ? "text-slate-900" : "text-slate-700"
                      }`}>
                        {feature.title}
                      </h3>
                      {/* Only show badge if metric is not empty */}
                      {feature.metric && (
                        <span className={`text-xs font-medium px-2 py-1 rounded ${feature.title === 'Adaptive Paths' ? 'bg-blue-100 text-blue-700' : 'text-slate-500 bg-slate-100'}`}>
                          {feature.metric}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm">{feature.description}</p>
                    <div className={`h-0.5 bg-slate-900 transition-all duration-500 rounded-full mt-3 ${
                      activeFeature === index ? "w-full" : "w-0"
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <div className="terminal-minimal h-full">
            <div className="terminal-header">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-sm text-slate-500 font-medium">spark.os/demo</div>
              <div className="flex items-center space-x-2">
                <div className="status-dot online"></div>
                <span className="text-xs text-slate-500">LIVE</span>
              </div>
            </div>

            <div className="terminal-body">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-slate-100 rounded-lg">
                  {React.createElement(features[activeFeature].icon, {
                    className: "h-6 w-6 text-slate-700",
                  })}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">{features[activeFeature].title}</h3>
                  <div className="h-0.5 bg-slate-900 w-full mt-1 rounded-full" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex">
                  <span className="terminal-prompt">$</span>
                  <span className="terminal-output ml-2">
                    spark --feature {features[activeFeature].title.toLowerCase().replace(/\s+/g, "_")}
                  </span>
                </div>

                <div className="text-slate-600 ml-4">{features[activeFeature].demo}</div>

                <div className="flex items-center space-x-2 ml-4 mt-4">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-600 font-medium text-sm">Feature active and running</span>
                </div>

                {/* Status/Performance section */}
                <div className="bg-slate-50 rounded-lg p-3 ml-4 mt-4">
                  <div className="text-xs text-slate-500 mb-1">
                    {features[activeFeature].title === 'Adaptive Paths' ? 'Status' : 'Performance'}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    {features[activeFeature].title === 'Adaptive Paths' ? (
                      <>
                        <span className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded">In Progress</span>
                        <span className="text-yellow-800 bg-yellow-200 px-2 py-1 rounded">BETA</span>
                      </>
                    ) : (
                      features[activeFeature].metric
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoreFeaturesSection; 