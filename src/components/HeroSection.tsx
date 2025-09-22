import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface HeroSectionProps {
  onCategorySelect: (category: string) => void
}

export function HeroSection({ onCategorySelect }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 4.5 }}
      className="relative h-screen flex"
    >
      {/* Fashion Section - Left */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-1/2 group cursor-pointer overflow-hidden"
        onClick={() => onCategorySelect('women')}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1580698864216-8008843ce6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50fGVufDF8fHx8MTc1ODI3ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Fashion"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ y: 80, opacity: 0, rotateX: 15 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-20 left-12 z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            transition={{ duration: 0.8, delay: 5.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px bg-gradient-to-r from-yellow-400 to-transparent mb-6"
          />
          <motion.h2 
            initial={{ letterSpacing: '0.1em' }}
            animate={{ letterSpacing: '0.05em' }}
            transition={{ duration: 1, delay: 5.2 }}
            className="text-5xl md:text-7xl text-white mb-6 font-playfair leading-tight"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1)'
            }}
          >
            Fashion &<br />
            <span className="font-cormorant italic" style={{ fontVariant: 'small-caps' }}>
              Accessories
            </span>
          </motion.h2>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              x: 15,
              boxShadow: '0 10px 40px rgba(255,255,255,0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 5.8 }}
            className="relative bg-white/90 backdrop-blur-sm text-black px-10 py-4 tracking-[0.3em] text-sm border border-white/20 hover:bg-white transition-all duration-500 font-cormorant overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">DISCOVER COLLECTION</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Beauty Section - Right */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-1/2 group cursor-pointer overflow-hidden"
        onClick={() => onCategorySelect('beauty')}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1591375275686-e9b036b15f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYmVhdXR5JTIwY29zbWV0aWNzfGVufDF8fHx8MTc1ODI4NzcyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Beauty"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ y: 80, opacity: 0, rotateX: 15 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 5.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-20 right-12 z-20 text-right"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            transition={{ duration: 0.8, delay: 5.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px bg-gradient-to-l from-yellow-400 to-transparent mb-6 ml-auto"
          />
          <motion.h2 
            initial={{ letterSpacing: '0.1em' }}
            animate={{ letterSpacing: '0.05em' }}
            transition={{ duration: 1, delay: 5.4 }}
            className="text-5xl md:text-7xl text-white mb-6 font-playfair leading-tight"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1)'
            }}
          >
            Perfumes &<br />
            <span className="font-cormorant italic" style={{ fontVariant: 'small-caps' }}>
              Beauty
            </span>
          </motion.h2>
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              x: -15,
              boxShadow: '0 10px 40px rgba(255,255,255,0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 6 }}
            className="relative bg-white/90 backdrop-blur-sm text-black px-10 py-4 tracking-[0.3em] text-sm border border-white/20 hover:bg-white transition-all duration-500 font-cormorant overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-yellow-400/10 to-transparent"
              initial={{ x: '100%' }}
              whileHover={{ x: '-100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">DISCOVER COLLECTION</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Luxury Center Logo Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.5, delay: 5.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div 
          whileHover={{ 
            scale: 1.05, 
            rotateY: 5,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative bg-white/95 backdrop-blur-md px-12 py-8 border border-white/20 overflow-hidden group"
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
          }}
        >
          {/* Subtle Gold Accent */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-yellow-400 to-yellow-600"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1, delay: 6 }}
          />
          
          <motion.h1 
            className="text-4xl md:text-6xl text-black mb-3 font-playfair"
            style={{ 
              background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em'
            }}
          >
            Maison
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ duration: 0.8, delay: 6.2 }}
            className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-3"
          />
          
          <motion.p 
            className="text-xl md:text-2xl text-black font-cormorant"
            style={{ 
              fontVariant: 'small-caps',
              letterSpacing: '0.4em',
              color: '#2a2a2a'
            }}
          >
            ÉLÉGANCE
          </motion.p>
          
          {/* Hover Effect Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}