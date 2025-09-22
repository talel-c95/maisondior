import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { useRef, ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  offset?: string[]
}

// Scroll-triggered 3D panel shifts
export function ScrollPanel({ children, className = "", offset = ["start end", "end start"] }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 0])
  
  const smoothRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })
  const smoothZ = useSpring(z, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        z: smoothZ,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax background layers
export function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className = "",
  offset = ["start end", "end start"]
}: ScrollAnimationProps & { speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${speed * -100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{
        y: smoothY,
        opacity: smoothOpacity
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Golden accent lines that animate on scroll
export function ScrollingAccentLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  })

  const width = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '100%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  const smoothWidth = useSpring(width, { stiffness: 200, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{
        width: smoothWidth,
        opacity: smoothOpacity
      }}
      className={`h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent ${className}`}
    />
  )
}

// Cinematic fade-in on scroll
export function ScrollFadeIn({ 
  children, 
  className = "",
  delay = 0,
  offset = ["start 0.8", "start 0.3"]
}: ScrollAnimationProps & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: smoothOpacity,
        y: smoothY,
        scale: smoothScale
      }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}