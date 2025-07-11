"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function SparkieAlien({ mood = "alert", size = 300, className = "", interactive = false, onClick }) {
  const [currentMood, setCurrentMood] = useState(mood)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    setCurrentMood(mood)
  }, [mood])

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 200)
      }
    }, 2000)

    return () => clearInterval(blinkInterval)
  }, [])

  const handleClick = () => {
    if (!interactive) return
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)
    if (onClick) onClick()
  }

  return (
    <div
      className={`relative ${className} ${interactive ? "cursor-pointer" : ""}`}
      style={{ width: size, height: size }}
      onClick={handleClick}
    >
      <motion.div animate={isClicked ? { scale: 0.95 } : { scale: 1 }} transition={{ duration: 0.2 }}>
        <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Cosmic glow */}
          <motion.ellipse
            cx="120"
            cy="140"
            rx="70"
            ry="60"
            fill="url(#cosmicGlow)"
            opacity="0.3"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            }}
          />

          {/* Shadow */}
          <ellipse cx="120" cy="210" rx="40" ry="8" fill="#5b3e8c" fillOpacity="0.2" />

          {/* Body */}
          <motion.circle
            cx="120"
            cy="130"
            r="60"
            fill="#9d7fe2"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
            }}
          />

          {/* Tummy/belly spot */}
          <ellipse cx="120" cy="145" rx="40" ry="35" fill="#b99fe0" />

          {/* Alien arms */}
          <path
            d="M70 120 C60 110, 55 140, 70 150 C80 155, 90 145, 70 120Z"
            fill="#8a5cc0"
            stroke="#7a4cb0"
            strokeWidth="1.5"
          />
          <path
            d="M170 120 C180 110, 185 140, 170 150 C160 155, 150 145, 170 120Z"
            fill="#8a5cc0"
            stroke="#7a4cb0"
            strokeWidth="1.5"
          />

          {/* Alien antennae */}
          <motion.g
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            <path d="M100 70 C95 60, 90 40, 95 30" stroke="#8a5cc0" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="95" cy="30" r="5" fill="#64e3ff" />

            <path
              d="M140 70 C145 60, 150 40, 145 30"
              stroke="#8a5cc0"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="145" cy="30" r="5" fill="#64e3ff" />
          </motion.g>

          {/* Face - Big alien eyes */}
          <circle cx="100" cy="110" r="24" fill="white" />
          <circle cx="140" cy="110" r="24" fill="white" />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <path d="M90 110 Q100 100, 110 110" stroke="#333" strokeWidth="3" fill="none" />
              <path d="M130 110 Q140 100, 150 110" stroke="#333" strokeWidth="3" fill="none" />
            </>
          ) : (
            <>
              <circle cx="100" cy="110" r="16" fill="#333" />
              <circle cx="140" cy="110" r="16" fill="#333" />
              <circle cx="95" cy="105" r="6" fill="#64e3ff" />
              <circle cx="135" cy="105" r="6" fill="#64e3ff" />
              <circle cx="105" cy="115" r="3" fill="white" opacity="0.5" />
              <circle cx="145" cy="115" r="3" fill="white" opacity="0.5" />
            </>
          )}

          {/* Alien blush */}
          <circle cx="80" cy="125" r="10" fill="#ff9a9e" fillOpacity="0.3" />
          <circle cx="160" cy="125" r="10" fill="#ff9a9e" fillOpacity="0.3" />

          {/* Mouth */}
          <path d="M110 135 Q120 140, 130 135" stroke="#333" strokeWidth="2" fill="none" />

          {/* Cosmic glow gradient */}
          <defs>
            <radialGradient id="cosmicGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#64e3ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#9d7fe2" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  )
} 