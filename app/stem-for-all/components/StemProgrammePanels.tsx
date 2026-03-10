"use client"

import { Handshake, Heart, Microscope, Sprout, Target } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import type { MutableRefObject } from "react"
import Image from "next/image"

type StemProgrammePanelsProps = {
  panelViewport: {
    once: boolean
    amount: number
  }
  prefersReducedMotion: boolean | null
  revealClip: Variants
  revealPanel: Variants
  scopePanelsRef: MutableRefObject<Array<HTMLElement | null>>
}

type CollaboratorLogo = {
  name: string
  src: string
  width: number
  height: number
}

const stemExperienceItems = [
  {
    title: "Hands-on STEM activities",
    description: "robotics, logic thinking, creative exploration",
    icon: Microscope,
  },
  {
    title: "AI-assisted adaptive learning",
    description: "powered by SparkOS",
    icon: Target,
  },
  {
    title: "Emotion-aware learning support",
    description: "behaviour-responsive guidance",
    icon: Heart,
  },
  {
    title: "Small-group guidance",
    description: "in a safe, low-stress environment",
    icon: Handshake,
  },
]

const stemOutcomeItems = [
  {
    outcome: "Increased curiosity and creativity",
    icon: Sprout,
    number: "01",
  },
  {
    outcome: "Stronger confidence and motivation",
    icon: Target,
    number: "02",
  },
  {
    outcome: "Improved problem-solving skills",
    icon: Microscope,
    number: "03",
  },
  {
    outcome: "A positive, supportive learning experience",
    icon: Handshake,
    number: "04",
  },
]

const collaboratorLogos: CollaboratorLogo[] = [
  {
    name: "Aletheia EdTech R&D Singapore",
    src: "/logos/aletheia-logo.png",
    width: 176,
    height: 54,
  },
  {
    name: "SparkOS Education Ecosystem",
    src: "/logos/sparkos-wordmark.svg",
    width: 232,
    height: 64,
  },
  {
    name: "Nanyang Technological University (NTU), Singapore",
    src: "/logos/ntu-wordmark.svg",
    width: 236,
    height: 74,
  },
  {
    name: "Robotics Games Society (RGS)",
    src: "/logos/rgs-logo.svg",
    width: 190,
    height: 74,
  },
]

const panelBaseClass =
  "min-h-[100svh] scroll-mt-24 md:scroll-mt-28 flex items-center justify-center py-12 md:py-16"

const panelContentAboutClass = "w-full md:-translate-y-2"
const panelContentClass = "w-full md:-translate-y-6"
const panelContentLiftedClass = "w-full md:-translate-y-16"
const panelContentFeatureClass = "w-full md:-translate-y-24"

function renderCollaboratorCard(collaborator: CollaboratorLogo, key: string) {
  return (
    <article
      key={key}
      className="h-full min-h-[210px] rounded-2xl border border-neutral-300/90 bg-white/95 px-5 py-6 text-center shadow-[0_10px_24px_rgba(0,0,0,0.04)] md:px-6 md:py-7"
      aria-label={collaborator.name}
    >
      <div className="flex min-h-[108px] items-center justify-center">
        <Image
          src={collaborator.src}
          alt={`${collaborator.name} logo`}
          width={collaborator.width}
          height={collaborator.height}
          className="h-auto max-h-20 w-auto object-contain"
        />
      </div>
      <p className="mt-4 text-sm md:text-base font-normal leading-relaxed tracking-normal text-neutral-700">
        {collaborator.name}
      </p>
    </article>
  )
}

export function StemProgrammePanels({
  panelViewport,
  prefersReducedMotion,
  revealClip,
  revealPanel,
  scopePanelsRef,
}: StemProgrammePanelsProps) {
  return (
    <div className="relative">
      <motion.section
        ref={(el) => {
          scopePanelsRef.current[0] = el
        }}
        className={`${panelBaseClass} text-center`}
        variants={revealPanel}
        initial="hidden"
        whileInView="show"
        viewport={panelViewport}
        aria-labelledby="stem-about-title"
      >
        <div className={`mx-auto max-w-3xl space-y-8 md:space-y-10 ${panelContentClass}`}>
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
              <Sprout className="h-5 w-5" />
            </span>
            <motion.h3
              id="stem-about-title"
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900"
              variants={revealClip}
            >
              ABOUT STEMFORALL
            </motion.h3>
          </div>
          <div className="mx-auto max-w-3xl space-y-5">
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-normal text-neutral-700">
              STEMforALL is a social impact education initiative initiated by Aletheia EdTech R&amp;D Singapore.
            </p>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-normal text-neutral-700">
              We believe that education should never be limited by financial background or learning differences.
            </p>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-normal text-neutral-700">
              In today&apos;s AI-driven world, STEM skills are essential. This programme provides free, inclusive, and child-centred STEM learning to help every child build confidence, curiosity, and future-ready skills.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={(el) => {
          scopePanelsRef.current[1] = el
        }}
        className={`${panelBaseClass} border-t border-neutral-200`}
        variants={revealPanel}
        initial="hidden"
        whileInView="show"
        viewport={panelViewport}
        aria-labelledby="stem-experience-title"
      >
        <div className={`mx-auto max-w-6xl space-y-9 md:space-y-11 ${panelContentClass}`}>
          <div className="flex items-center justify-center text-center">
            <motion.h3
              id="stem-experience-title"
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900"
              variants={revealClip}
            >
              WHAT CHILDREN WILL EXPERIENCE
            </motion.h3>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {stemExperienceItems.map((item) => {
              const ItemIcon = item.icon
              return (
                <article
                  key={item.title}
                  className="flex min-h-[236px] flex-col rounded-2xl border border-neutral-300/90 bg-white/95 p-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.04)] md:p-6"
                >
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                    <ItemIcon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-5 text-xl md:text-2xl font-semibold tracking-tight leading-snug text-neutral-900">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-base md:text-lg font-normal leading-relaxed tracking-normal text-neutral-700">
                    {item.description}
                  </p>
                </article>
              )
            })}
          </div>
          <p className="mx-auto max-w-3xl text-center text-lg md:text-xl font-normal leading-relaxed tracking-normal text-neutral-700">
            Learning designed for different abilities and learning styles
          </p>
        </div>
      </motion.section>

      <motion.section
        ref={(el) => {
          scopePanelsRef.current[2] = el
        }}
        className={`${panelBaseClass} border-t border-neutral-200`}
        variants={revealPanel}
        initial="hidden"
        whileInView="show"
        viewport={panelViewport}
        aria-labelledby="stem-partners-title"
      >
        <div className={`mx-auto max-w-6xl space-y-9 md:space-y-11 ${panelContentClass}`}>
          <div className="flex items-center justify-center text-center">
            <motion.h3
              id="stem-partners-title"
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900"
              variants={revealClip}
            >
              COLLABORATION PARTNERS
            </motion.h3>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {collaboratorLogos.map((collaborator) =>
              renderCollaboratorCard(collaborator, `collaborator-${collaborator.name}`)
            )}
          </div>
          <p className="mx-auto max-w-3xl text-center text-lg md:text-xl font-normal leading-relaxed tracking-normal text-neutral-700">
            Educators, community partners, and volunteers
          </p>
        </div>
      </motion.section>

      <motion.section
        ref={(el) => {
          scopePanelsRef.current[3] = el
        }}
        className={`${panelBaseClass} border-t border-neutral-200`}
        variants={revealPanel}
        initial="hidden"
        whileInView="show"
        viewport={panelViewport}
        aria-labelledby="stem-free-title"
      >
        <div className={`mx-auto max-w-3xl space-y-8 text-center md:space-y-10 ${panelContentLiftedClass}`}>
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
              <Heart className="h-5 w-5" />
            </span>
            <motion.h3
              id="stem-free-title"
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900"
              variants={revealClip}
            >
              WHY THIS PROGRAMME IS FREE
            </motion.h3>
          </div>
          <div className="space-y-6 md:space-y-8">
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-normal text-neutral-700">
              We believe every child deserves to be seen, understood, and supported.
            </p>
            <p className="text-lg md:text-xl font-normal leading-relaxed tracking-normal text-neutral-700">
              STEMforALL removes financial and systemic barriers to education, especially for children with special learning needs. This initiative is part of Aletheia&apos;s Tech-for-Good commitment, using technology and education research to create meaningful social impact.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        ref={(el) => {
          scopePanelsRef.current[4] = el
        }}
        className={`${panelBaseClass} border-t border-neutral-200`}
        variants={revealPanel}
        initial="hidden"
        whileInView="show"
        viewport={panelViewport}
        aria-labelledby="stem-outcomes-title"
      >
        <div className={`mx-auto max-w-[1200px] space-y-9 md:space-y-10 ${panelContentLiftedClass}`}>
          <div className="flex items-center justify-center text-center">
            <motion.h3
              id="stem-outcomes-title"
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900"
              variants={revealClip}
            >
              LEARNING OUTCOMES
            </motion.h3>
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {stemOutcomeItems.map((item) => {
              const OutcomeIcon = item.icon

              return (
                <li
                  key={item.outcome}
                  className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[28px] border border-neutral-300/90 bg-gradient-to-b from-white/95 to-neutral-100/80 px-5 py-5 text-center shadow-[0_18px_38px_rgba(0,0,0,0.05)] transition-transform duration-300 md:min-h-[310px] md:px-6 md:py-6"
                >
                  <div className="flex items-start justify-start">
                    <span className="text-[2.2rem] font-normal leading-none tracking-tight text-neutral-300/80 md:text-[2.5rem]">
                      {item.number}
                    </span>
                  </div>
                  <span className="mx-auto mt-5 inline-flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-neutral-50/95 text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_18px_rgba(0,0,0,0.04)]">
                    <OutcomeIcon className="h-10 w-10" />
                  </span>
                  <p className="mx-auto mt-7 max-w-[12ch] text-[1.8rem] font-normal leading-[1.08] tracking-tight text-neutral-800 md:text-[1.95rem]">
                    {item.outcome}
                  </p>
                  <div className="mx-auto mt-auto pt-7">
                    <div className="h-px w-16 bg-neutral-300 transition-all duration-300 group-hover:w-24 group-hover:bg-neutral-500" />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </motion.section>

      <motion.section
        ref={(el) => {
          scopePanelsRef.current[5] = el
        }}
        className={`${panelBaseClass} border-t border-neutral-300 text-center`}
        variants={revealPanel}
        initial="hidden"
        whileInView="show"
        viewport={panelViewport}
      >
        <div className={`mx-auto max-w-4xl space-y-3 text-center md:space-y-4 ${panelContentFeatureClass}`}>
          <p className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900">
            <span className="block">STEMforALL &mdash; Tech for Good</span>
            <span className="block">Education for All</span>
          </p>
          <p className="text-lg md:text-xl font-normal tracking-normal text-neutral-600">
            Powered by SparkOS Education Ecosystem
          </p>
        </div>
      </motion.section>
    </div>
  )
}
