"use client"

import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"

type SparkieBuddyProps = {
  className?: string
  size?: number
}

export default function SparkieBuddy({ className = "", size = 120 }: SparkieBuddyProps) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const scrollReaction = useSpring(scrollVelocity, {
    stiffness: 150,
    damping: 26,
    mass: 0.7,
  })

  const scrollFloat = useTransform(scrollReaction, (value) => {
    if (shouldReduceMotion) return 0
    return Math.max(-9, Math.min(12, (value / 1400) * 12))
  })
  const scrollTilt = useTransform(scrollReaction, (value) => {
    if (shouldReduceMotion) return 0
    return Math.max(-4, Math.min(4, (value / 1400) * 4))
  })
  const antennaSway = useTransform(scrollReaction, (value) => {
    if (shouldReduceMotion) return 0
    return Math.max(-10, Math.min(10, (value / 1400) * 10))
  })
  const antennaLift = useTransform(scrollReaction, (value) => {
    if (shouldReduceMotion) return 0
    return -Math.min(8, Math.abs(value) / 220)
  })
  const shadowScaleX = useTransform(scrollReaction, (value) => {
    if (shouldReduceMotion) return 1
    return 1 - Math.min(0.18, Math.abs(value) / 6000)
  })
  const shadowScaleY = useTransform(scrollReaction, (value) => {
    if (shouldReduceMotion) return 1
    return 1 - Math.min(0.08, Math.abs(value) / 9000)
  })
  const shadowOpacity = useTransform(scrollReaction, (value) => {
    if (shouldReduceMotion) return 0.5
    return 0.5 - Math.min(0.2, Math.abs(value) / 7000)
  })

  return (
    <div aria-hidden="true" className={className} style={{ width: size, height: size }}>
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <motion.ellipse
          cx="120"
          cy="218"
          rx="56"
          ry="11"
          fill="#B8C6DD"
          style={{
            transformOrigin: "120px 218px",
            scaleX: shadowScaleX,
            scaleY: shadowScaleY,
            opacity: shadowOpacity,
          }}
        />

        <motion.g
          style={{
            transformOrigin: "120px 126px",
            y: scrollFloat,
            rotate: scrollTilt,
          }}
        >
          <motion.g
          animate={{
            y: shouldReduceMotion ? 0 : [0, 4, 16, 0],
            rotate: shouldReduceMotion ? 0 : [0, 1.4, -1.1, 0],
            scale: shouldReduceMotion ? 1 : [1, 0.992, 0.975, 1],
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 3.4,
            ease: "easeInOut",
            repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
            times: shouldReduceMotion ? undefined : [0, 0.38, 0.76, 1],
          }}
        >
            <motion.g
              style={{
                transformOrigin: "120px 42px",
                y: antennaLift,
                rotate: antennaSway,
              }}
            >
              <path
                d="M88 66C78 52 76 34 80 20"
                stroke="#53A4E8"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M152 66C162 52 164 34 160 20"
                stroke="#53A4E8"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="80" cy="14" r="10" fill="#A8C4EE" />
              <circle cx="160" cy="14" r="10" fill="#A8C4EE" />
            </motion.g>

            <ellipse cx="120" cy="128" rx="84" ry="78" fill="#A1BDE9" />
            <ellipse cx="120" cy="147" rx="62" ry="56" fill="#B9CCE9" />

            <ellipse
              cx="56"
              cy="144"
              rx="18"
              ry="30"
              transform="rotate(-22 56 144)"
              fill="#4E9AE2"
              stroke="#2587D4"
              strokeWidth="2"
            />
            <ellipse
              cx="184"
              cy="144"
              rx="18"
              ry="30"
              transform="rotate(22 184 144)"
              fill="#4E9AE2"
              stroke="#2587D4"
              strokeWidth="2"
            />

            <ellipse cx="92" cy="114" rx="33" ry="38" fill="#F1EEF7" />
            <ellipse cx="148" cy="114" rx="33" ry="38" fill="#F1EEF7" />

            <circle cx="92" cy="114" r="22" fill="#2F2F32" />
            <circle cx="148" cy="114" r="22" fill="#2F2F32" />
            <circle cx="84" cy="106" r="9" fill="#61C9E7" />
            <circle cx="140" cy="106" r="9" fill="#61C9E7" />
            <circle cx="100" cy="122" r="4" fill="#FFFFFF" fillOpacity="0.55" />
            <circle cx="156" cy="122" r="4" fill="#FFFFFF" fillOpacity="0.55" />

            <circle cx="66" cy="133" r="16" fill="#E9AEBB" fillOpacity="0.55" />
            <circle cx="174" cy="133" r="16" fill="#E9AEBB" fillOpacity="0.55" />

            <path
              d="M107 148C115 152 125 152 133 148"
              stroke="#050505"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  )
}
