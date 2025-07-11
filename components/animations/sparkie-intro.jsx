"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SparkieAlien from "./sparkie-alien"

export default function SparkieIntro() {
  const [currentInteraction, setCurrentInteraction] = useState(0)
  const [showFloatingText, setShowFloatingText] = useState(false)
  const [currentText, setCurrentText] = useState("")

  const interactions = [
    {
      type: "wave",
      text: "Hiya! I'm Sparkie!",
      sparkieMood: "alert",
      duration: 3000,
    },
    {
      type: "introduce",
      text: "I'm your new study buddy! 💫",
      sparkieMood: "curious",
      duration: 3200,
    },
    {
      type: "present",
      text: "Ready for some learning magic? ✨",
      sparkieMood: "alert",
      duration: 3500,
    },
  ]

  useEffect(() => {
    // Start interactions immediately
    startInteractions()
  }, [])

  const startInteractions = () => {
    setCurrentInteraction(0)
    performInteraction(0)
  }

  const performInteraction = (index) => {
    if (index >= interactions.length) {
      // Loop back to the beginning after all interactions
      setTimeout(() => {
        setCurrentInteraction(0)
        performInteraction(0)
      }, 2500)
      return
    }

    const interaction = interactions[index]
    setCurrentText(interaction.text)
    setShowFloatingText(true)

    setTimeout(() => {
      setShowFloatingText(false)
      setTimeout(() => {
        setCurrentInteraction(index + 1)
        performInteraction(index + 1)
      }, 600)
    }, interaction.duration)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{
          opacity: 1,
          scale: 1,
          background: [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          ],
        }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 1, ease: "easeOut" },
          background: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }}
        className="absolute inset-0"
      />

      {/* Interactive particles that respond to Sparkie */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-1 h-1 bg-blue-200/40' : 
              i % 3 === 1 ? 'w-1.5 h-1.5 bg-purple-200/30' : 
              'w-2 h-2 bg-cyan-200/25'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: showFloatingText ? [0.4, 0.7, 0.4] : [0.2, 0.35, 0.2],
              scale: showFloatingText ? [1, 1.3, 1] : [0.8, 1.1, 0.8],
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              opacity: { delay: i * 0.1 },
              scale: { delay: i * 0.1 },
              y: {
                duration: Math.random() * 3 + 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 2,
              },
              x: {
                duration: Math.random() * 5 + 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: Math.random() * 3,
              },
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen max-h-screen px-4 py-8">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
          {/* Sparkie with interactive elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 1.5,
            }}
            className="relative"
          >
                {/* Magical floating text around Sparkie - NO DIALOGUE BOX */}
                <AnimatePresence>
                  {showFloatingText && currentText && (
                    <>
                      {/* Main floating text with magical glow effects */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: 50 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          rotate: [0, 2, -2, 0], // Subtle rotation animation
                        }}
                        exit={{ opacity: 0, scale: 0, y: -50 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                        }}
                        className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-20"
                      >
                        <motion.div
                          className="text-white text-3xl md:text-4xl font-bold tracking-wide"
                          style={{
                            // Glowing text shadow effects for magical feel
                            textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)",
                            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                          }}
                          animate={{
                            // Text glows and pulses with magical effects
                            scale: [1, 1.1, 1],
                            textShadow: [
                              "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)",
                              "0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.6)",
                              "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)",
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          {currentText}
                        </motion.div>
                      </motion.div>

                      {/* Sparkle particles that float around the text */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            left: `${45 + Math.random() * 10}%`,
                            top: `${15 + Math.random() * 10}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            y: [0, -20, -40],
                            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.3,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Non-interactive Sparkie with magical atmosphere */}
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  {/* Orbital rings that react to interactions */}
                  <motion.div
                    className="absolute inset-0 -m-12"
                    animate={{
                      rotate: 360,
                      scale: showFloatingText ? [1, 1.2, 1] : [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { 
                        duration: showFloatingText ? 0.8 : 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      },
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border border-blue-200/4 border-dashed" />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 -m-16"
                    animate={{
                      rotate: -360,
                      scale: showFloatingText ? [1, 1.2, 1] : [1, 1.06, 1],
                    }}
                    transition={{
                      rotate: { duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { 
                        duration: showFloatingText ? 0.8 : 4.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      },
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border border-purple-200/3 border-dotted" />
                  </motion.div>

                  {/* Additional ripple rings for better effect */}
                  <motion.div
                    className="absolute inset-0 -m-24"
                    animate={{
                      rotate: 360,
                      scale: showFloatingText ? [1, 1.25, 1] : [1, 1.08, 1],
                      opacity: showFloatingText ? [0.15, 0.03, 0.15] : [0.03, 0.01, 0.03],
                    }}
                    transition={{
                      rotate: { duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { 
                        duration: showFloatingText ? 1.2 : 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      },
                      opacity: { 
                        duration: showFloatingText ? 1.2 : 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      },
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border border-cyan-200/2" />
                  </motion.div>

                  {/* Enhanced glow that pulses with interactions */}
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-full blur-2xl scale-150"
                    animate={{
                      opacity: showFloatingText ? [0.3, 0.8, 0.3] : [0.2, 0.4, 0.2],
                      scale: showFloatingText ? [1.5, 2.0, 1.5] : [1.5, 1.8, 1.5],
                    }}
                    transition={{
                      duration: showFloatingText ? 1 : 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Sparkie at optimized size, non-interactive */}
                  <SparkieAlien
                    size={320}
                    mood={interactions[Math.min(currentInteraction, interactions.length - 1)]?.sparkieMood || "alert"}
                    interactive={false}
                  />
                </motion.div>
              </motion.div>
        </div>
      </div>

      {/* Interactive scan line that responds to Sparkie's state */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: showFloatingText
            ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: showFloatingText ? 4 : 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
} 