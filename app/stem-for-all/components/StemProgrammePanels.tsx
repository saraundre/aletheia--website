"use client"

import { Handshake, Heart, Microscope, Sprout, Target } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { useState, type MutableRefObject } from "react"
import Image from "next/image"
import Link from "next/link"

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
    name: "Aletheia",
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
  {
    name: "National Library Board (NLB), Singapore",
    src: "/logos/nlb-logo.png",
    width: 300,
    height: 200,
  },
]

const panelBaseClass =
  "min-h-[100svh] scroll-mt-24 md:scroll-mt-28 flex items-center justify-center py-12 md:py-16"

const panelContentClass = "w-full md:-translate-y-6"
const panelContentLiftedClass = "w-full md:-translate-y-16"

function renderCollaboratorCard(collaborator: CollaboratorLogo, key: string) {
  return (
    <article
      key={key}
      className="h-full min-h-[210px] rounded-2xl border border-neutral-300/90 bg-white/95 px-5 py-6 text-center shadow-[0_10px_24px_rgba(0,0,0,0.04)] md:px-6 md:py-7"
      aria-label={collaborator.name}
    >
      <div className="flex min-h-[108px] items-center justify-center px-2">
        <Image
          src={collaborator.src}
          alt={`${collaborator.name} logo`}
          width={collaborator.width}
          height={collaborator.height}
          className="h-auto max-h-28 max-w-full w-auto object-contain"
        />
      </div>
      <p className="mt-4 text-sm md:text-base font-normal leading-relaxed tracking-normal text-neutral-700">
        {collaborator.name}
      </p>
    </article>
  )
}

function AboutUsPanel({
  panelContentClass,
  revealClip,
}: {
  panelContentClass: string
  revealClip: Variants
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`mx-auto max-w-3xl space-y-6 md:space-y-8 ${panelContentClass}`}>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
          <Sprout className="h-5 w-5" />
        </span>
        <motion.h3
          id="stem-about-title"
          className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-neutral-900"
          variants={revealClip}
        >
          About Us
        </motion.h3>
      </div>
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <p className="text-base md:text-lg font-normal leading-relaxed tracking-normal text-neutral-700">
          STEM for All delivers STEM programmes that ignite and sustain long term interest in science, technology, engineering, and mathematics. We believe that increasing STEM literacy in our next generation will enable them to better navigate this increasingly digital world.
        </p>
        {expanded && (
          <>
            <p className="text-base md:text-lg font-normal leading-relaxed tracking-normal text-neutral-700">
              And so, STEM for All is on a mission to build an ecosystem of opportunities, support and platform that empowers all young people to push boundaries and experiment to find new and better ways of doing things. We celebrate diversity, proactively elevate marginalised voices, and are intentionally inclusive in everything we do.
            </p>
            <p className="text-base md:text-lg font-normal leading-relaxed tracking-normal text-neutral-700">
              That is to create a more equitable world, where no curious mind is left behind.
            </p>
          </>
        )}
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-base md:text-lg font-normal tracking-wide text-neutral-600 underline underline-offset-4 hover:text-neutral-900 transition-colors duration-200"
          >
            Learn More
          </button>
        )}
      </div>
      <div className="pt-2 flex justify-center">
        <Link
          href="/tech4all"
          className="inline-block py-4 px-8 text-lg font-normal tracking-wide text-neutral-900 border border-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
        >
          Tech4All
        </Link>
      </div>
    </div>
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
        className="scroll-mt-24 md:scroll-mt-28 flex items-center justify-center py-20 md:py-28 text-center"
        variants={revealPanel}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        aria-labelledby="stem-about-title"
      >
        <AboutUsPanel panelContentClass="w-full" revealClip={revealClip} />
      </motion.section>

      <motion.section
        ref={(el) => {
          scopePanelsRef.current[0] = el
        }}
        className={`${panelBaseClass} border-t border-neutral-200`}
        variants={revealPanel}
        initial="hidden"
        whileInView="show"
        viewport={panelViewport}
        aria-labelledby="stem-experience-title"
      >
        <div className={`mx-auto max-w-6xl space-y-6 md:space-y-8 ${panelContentClass}`}>
          <div className="flex items-center justify-center text-center">
            <motion.h3
              id="stem-experience-title"
              className="text-3xl md:text-5xl font-bold tracking-tight leading-normal text-neutral-900"
              variants={revealClip}
            >
              The STEM for All Programme
            </motion.h3>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="text-base md:text-lg font-normal leading-relaxed tracking-normal text-neutral-700">
              STEM for All offers a set of engaging and technically rigorous programme to all communities. Its curriculum is designed in accordance with the LEARN Roadmap (IMDA Singapore). LEARN Roadmaps are structured, broad-based training courses aim at helping students build basic skills in topics across tech and media domains, such as robotics, artificial intelligence and new media.
            </p>
            <p className="text-base md:text-lg font-normal leading-relaxed tracking-normal text-neutral-700">
              A curriculum that involves hardware, software programming and electronics, STEM for All is encouraging and forging the next generation of makers, coders and creators.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {stemExperienceItems.map((item) => {
              const ItemIcon = item.icon
              return (
                <article
                  key={item.title}
                  className="flex min-h-[160px] flex-col rounded-2xl border border-neutral-300/90 bg-white/95 p-4 text-center shadow-[0_10px_24px_rgba(0,0,0,0.04)] md:p-5"
                >
                  <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
                    <ItemIcon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 text-lg md:text-xl font-semibold tracking-tight leading-snug text-neutral-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm md:text-base font-normal leading-relaxed tracking-normal text-neutral-700">
                    {item.description}
                  </p>
                </article>
              )
            })}
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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5 xl:gap-6">
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
          scopePanelsRef.current[2] = el
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

    </div>
  )
}
