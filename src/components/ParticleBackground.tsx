import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

export function ParticleBackground({ count = 50, className = "" }: { count?: number, className?: string }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.5 + 0.1
    }))
    
    setParticles(initialParticles)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleResize = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      })))
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [count, mouseX, mouseY])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <ParticleElement
          key={particle.id}
          particle={particle}
          mouseX={springX}
          mouseY={springY}
        />
      ))}
    </div>
  )
}

function ParticleElement({ 
  particle, 
  mouseX, 
  mouseY 
}: { 
  particle: Particle
  mouseX: any
  mouseY: any 
}) {
  // Transform mouse position to particle influence
  const x = useTransform(mouseX, (value) => {
    const distance = Math.abs(value - particle.x)
    const influence = Math.max(0, 100 - distance) / 100
    return particle.x + (influence * (value - particle.x) * 0.1)
  })

  const y = useTransform(mouseY, (value) => {
    const distance = Math.abs(value - particle.y)
    const influence = Math.max(0, 100 - distance) / 100
    return particle.y + (influence * (value - particle.y) * 0.1)
  })

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-yellow-400/60 to-yellow-600/40"
      style={{
        x,
        y,
        width: particle.size,
        height: particle.size,
        opacity: particle.opacity,
        filter: 'blur(0.5px)',
        boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)'
      }}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
      }}
      transition={{ 
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Luxury background gradient that shifts
export function LuxuryBackgroundGradient({ className = "" }: { className?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const backgroundX = useTransform(springX, [0, window.innerWidth || 1920], [0, 100])
  const backgroundY = useTransform(springY, [0, window.innerHeight || 1080], [0, 100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: useTransform(
          [backgroundX, backgroundY],
          ([x, y]) => 
            `radial-gradient(circle at ${x}% ${y}%, rgba(212, 175, 55, 0.03) 0%, rgba(255, 255, 255, 0.01) 30%, transparent 70%)`
        )
      }}
    />
  )
}