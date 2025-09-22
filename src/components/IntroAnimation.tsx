import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

// Particle component for luxury effect
const Particle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ 
      opacity: 0, 
      scale: 0,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: "-=100"
    }}
    transition={{ 
      duration: 4,
      delay,
      repeat: Infinity,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    className="absolute w-1 h-1 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full"
    style={{
      filter: 'blur(0.5px)',
      boxShadow: '0 0 6px rgba(212, 175, 55, 0.6)'
    }}
  />
)

interface IntroAnimationProps {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState<'logo' | 'reveal' | 'complete'>('logo')

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('reveal'), 2000)
    const timer2 = setTimeout(() => {
      setStage('complete')
      onComplete()
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
      {/* Luxury Particles */}
      {[...Array(20)].map((_, i) => (
        <Particle key={i} delay={i * 0.2} />
      ))}
      
      {/* Ambient Light Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: stage === 'logo' ? 0.3 : 0, scale: stage === 'logo' ? 2 : 0.5 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 bg-gradient-radial from-yellow-100/30 via-transparent to-transparent"
      />
      
      {/* Logo Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, z: -100, rotateY: -15 }}
        animate={{ 
          opacity: stage === 'logo' ? 1 : 0.9, 
          scale: stage === 'logo' ? 1.1 : 0.7,
          z: stage === 'logo' ? 0 : -50,
          rotateY: stage === 'logo' ? 0 : -10
        }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute text-center"
        style={{
          filter: stage === 'logo' 
            ? 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.3)) drop-shadow(0 0 60px rgba(0,0,0,0.1))' 
            : 'none',
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.h1 
          initial={{ letterSpacing: '0.1em' }}
          animate={{ letterSpacing: stage === 'logo' ? '0.15em' : '0.05em' }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-7xl md:text-9xl text-black font-playfair"
          style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Maison
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: stage === 'logo' ? '80%' : '0%' }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto my-4"
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage === 'logo' ? 1 : 0.8, y: stage === 'logo' ? 0 : 10 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl md:text-4xl text-black tracking-[0.4em] font-cormorant"
          style={{ 
            fontVariant: 'small-caps',
            color: '#2a2a2a'
          }}
        >
          ÉLÉGANCE
        </motion.p>
      </motion.div>

      {/* Left Panel with Luxury Texture */}
      <motion.div
        initial={{ x: 0, rotateY: 0, z: 0 }}
        animate={{ 
          x: stage === 'reveal' ? '-52%' : 0,
          rotateY: stage === 'reveal' ? -8 : 0,
          z: stage === 'reveal' ? 100 : 0
        }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-0 top-0 w-1/2 h-full z-20"
        style={{ 
          transformOrigin: 'right center',
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)',
          boxShadow: stage === 'reveal' ? '20px 0 60px rgba(0,0,0,0.2)' : 'none'
        }}
      />

      {/* Right Panel with Luxury Texture */}
      <motion.div
        initial={{ x: 0, rotateY: 0, z: 0 }}
        animate={{ 
          x: stage === 'reveal' ? '52%' : 0,
          rotateY: stage === 'reveal' ? 8 : 0,
          z: stage === 'reveal' ? 100 : 0
        }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute right-0 top-0 w-1/2 h-full z-20"
        style={{ 
          transformOrigin: 'left center',
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(225deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)',
          boxShadow: stage === 'reveal' ? '-20px 0 60px rgba(0,0,0,0.2)' : 'none'
        }}
      />

      {/* Cinematic Background Reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ 
          opacity: stage === 'reveal' ? 1 : 0,
          scale: stage === 'reveal' ? 1 : 1.1
        }}
        transition={{ duration: 2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"
        style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}