import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState, useRef } from 'react'

export function LuxuryCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = target.matches('button, a, [role="button"], input, textarea, select') ||
                           target.closest('button, a, [role="button"], input, textarea, select')
      
      setIsPointer(isInteractive)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', moveCursor)
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 2 : 1,
            backgroundColor: isPointer ? '#d4af37' : '#ffffff'
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-full rounded-full"
          style={{
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
          }}
        />
      </motion.div>

      {/* Trailing Shimmer */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 0.8,
            opacity: isHovering ? 0.6 : 0.2
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-full rounded-full bg-gradient-radial from-yellow-400/30 via-yellow-400/10 to-transparent"
          style={{
            filter: 'blur(8px)'
          }}
        />
      </motion.div>
    </>
  )
}

// Ripple effect component for buttons
export function useRippleEffect() {
  const [ripples, setRipples] = useState<Array<{ x: number, y: number, id: number }>>([])

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const id = Date.now()

    setRipples(prev => [...prev, { x, y, id }])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id))
    }, 1000)
  }

  const RippleEffect = () => (
    <>
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full bg-gradient-radial from-yellow-400/40 to-transparent pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ 
            width: 200, 
            height: 200, 
            opacity: 0 
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        />
      ))}
    </>
  )

  return { createRipple, RippleEffect }
}