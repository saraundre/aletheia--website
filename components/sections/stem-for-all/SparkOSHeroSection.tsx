"use client"

import { ArrowRight } from 'lucide-react'

export default function SparkOSHeroSection() {
  return (
    <section className="section-padding">
      <div className="grid-minimal">
        <div className="col-span-12 text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full mb-8 border border-slate-200">
            <span className="text-slate-700 text-sm font-medium">Flagship Platform</span>
          </div>
          <h2 className="heading-lg mb-6">Spark.OS</h2>
          <p className="body-lg text-slate-600 max-w-2xl mx-auto">
            An education system designed for every mind. Adaptive, empathetic, and built with real students at the
            center of every decision.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <div className="terminal-minimal">
            <div className="terminal-header">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-sm text-slate-500 font-medium">spark.os</div>
              <div></div>
            </div>
            <div className="terminal-body space-y-3">
              <div className="flex">
                <span className="terminal-prompt">$</span>
                <span className="terminal-output ml-2">spark --status</span>
              </div>
              <div className="text-slate-600 ml-4 space-y-1">
                <div>✓ Pilot launching soon</div>
                <div>✓ Target: +28% improvement vs traditional methods</div>
                <div>✓ Expanding to China, Singapore, and beyond</div>
                <div>✓ Emotional AI ready</div>
              </div>
              <div className="flex mt-4">
                <span className="terminal-prompt">$</span>
                <span className="terminal-output ml-2">spark --impact neurodivergent</span>
              </div>
              <div className="text-emerald-600 ml-4 font-medium">"Ready to transform learning for ADHD students"</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 text-center mt-12">
          <button className="btn-primary inline-flex items-center">
            Explore Spark.OS
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
} 