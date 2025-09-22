import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useState, useRef, useCallback } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface ProductRotation360Props {
  images: string[]
  productName: string
  className?: string
}

export function ProductRotation360({ images, productName, className = "" }: ProductRotation360Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const rotation = useSpring(0, { stiffness: 200, damping: 30 })
  const scale = useSpring(1, { stiffness: 300, damping: 30 })
  const brightness = useSpring(1, { stiffness: 200, damping: 30 })
  
  // Transform rotation to image index
  const imageIndex = useTransform(rotation, (value) => {
    const normalizedRotation = ((value % 360) + 360) % 360
    return Math.floor((normalizedRotation / 360) * images.length)
  })

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    scale.set(1.05)
    brightness.set(1.2)
  }, [scale, brightness])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    scale.set(1)
    brightness.set(1)
  }, [scale, brightness])

  const handleDrag = useCallback((event: any, info: any) => {
    const deltaX = info.delta.x
    const rotationDelta = deltaX * 0.5 // Sensitivity factor
    rotation.set(rotation.get() + rotationDelta)
  }, [rotation])

  // Subscribe to image index changes
  imageIndex.on('change', (latest) => {
    const index = Math.max(0, Math.min(images.length - 1, latest))
    if (index !== currentImageIndex) {
      setCurrentImageIndex(index)
    }
  })

  const handleClick = useCallback(() => {
    // Auto-rotate on click
    const targetRotation = rotation.get() + 45
    rotation.set(targetRotation)
  }, [rotation])

  return (
    <div className={`relative ${className}`}>
      {/* Main 360° Product View */}
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        onClick={handleClick}
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        style={{
          scale,
          filter: useTransform(brightness, (value) => `brightness(${value}) contrast(1.1)`),
          transformStyle: 'preserve-3d'
        }}
        className="relative aspect-square cursor-grab active:cursor-grabbing bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-2xl"
      >
        {/* Current Image */}
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={images[currentImageIndex] || images[0]}
            alt={`${productName} - View ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Luxury Lighting Overlay */}
        <motion.div
          style={{
            background: useTransform(
              rotation,
              (value) => {
                const angle = ((value % 360) + 360) % 360
                return `linear-gradient(${angle}deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)`
              }
            )
          }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Drag Indicator */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: isDragging ? 0 : 1,
            scale: isDragging ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-cormorant backdrop-blur-sm"
          style={{ letterSpacing: '0.1em' }}
        >
          Drag to rotate • Click to spin
        </motion.div>

        {/* Reflection Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"
          style={{
            opacity: useTransform(brightness, [1, 1.2], [0.3, 0.6])
          }}
        />
      </motion.div>

      {/* Rotation Progress Indicator */}
      <motion.div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full border border-gray-300"
            animate={{
              backgroundColor: index === currentImageIndex ? '#d4af37' : 'transparent',
              scale: index === currentImageIndex ? 1.2 : 1
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>

      {/* View Counter */}
      <motion.div 
        className="text-center mt-2 text-sm text-gray-600 font-cormorant"
        style={{ letterSpacing: '0.1em' }}
      >
        View {currentImageIndex + 1} of {images.length}
      </motion.div>
    </div>
  )
}