"use client"
import { GraduationCap, Users, Settings, Building2 } from 'lucide-react'

const BuiltForEveryoneSection = () => {
  const audiences = [
    {
      icon: GraduationCap,
      title: "Students",
      description: "Self-directed learning with emotional support",
    },
    {
      icon: Users,
      title: "Educators", 
      description: "Tools that understand diverse minds",
    },
    {
      icon: Settings,
      title: "Administrators",
      description: "Analytics that matter, not just metrics",
    },
    {
      icon: Building2,
      title: "Organizations",
      description: "Scalable impact for underserved communities",
    },
  ]

  return (
    <section className="section-padding bg-slate-50">
      <div className="grid-minimal">
        <div className="col-span-12 text-center mb-16">
          <h2 className="heading-lg mb-6">Built for Everyone</h2>
          <p className="body-lg text-slate-600 max-w-2xl mx-auto">
            From individual learners to global institutions, Spark.OS serves the entire educational ecosystem.
          </p>
        </div>

        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <div key={index} className="card-minimal text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <audience.icon className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">{audience.title}</h3>
              <p className="text-slate-600 text-sm">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BuiltForEveryoneSection 