import { motion, useScroll, useTransform } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useRef } from 'react'
import { ScrollFadeIn, ScrollingAccentLine, ParallaxLayer } from './ScrollAnimations'
import { useRippleEffect } from './CursorEffects'

interface JournalProps {
  onBack: () => void
}

export function Journal({ onBack }: JournalProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5])

  const articles = [
    {
      id: 1,
      title: "The Art of Timeless Elegance",
      subtitle: "Exploring the philosophy behind Maison Élégance",
      image: "https://images.unsplash.com/photo-1719518411339-5158cea86caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc1ODIzMzk5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt: "In a world of fleeting trends, we believe in creating pieces that transcend time and season."
    },
    {
      id: 2,
      title: "Craftsmanship Redefined",
      subtitle: "Behind the scenes of our atelier",
      image: "https://images.unsplash.com/photo-1580698864216-8008843ce6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50fGVufDF8fHx8MTc1ODI3ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt: "Every stitch tells a story of dedication, passion, and uncompromising attention to detail."
    },
    {
      id: 3,
      title: "Sustainable Luxury",
      subtitle: "Our commitment to responsible fashion",
      image: "https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU4MjY2OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt: "Luxury and sustainability are not mutually exclusive. Discover our journey towards a better future."
    }
  ]

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen pt-24"
    >
      {/* Hero Section */}
      <motion.section
        style={{ y, opacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
        
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1719518411339-5158cea86caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDF8fHx8MTc1ODIzMzk5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Maison Journal"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-20 text-center text-white max-w-4xl mx-auto px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.1em' }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl md:text-8xl lg:text-9xl mb-8 font-playfair"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(255,255,255,0.3)'
            }}
          >
            Maison Journal
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1, delay: 1.2 }}
            className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-8"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-xl md:text-2xl font-cormorant opacity-90"
            style={{ 
              letterSpacing: '0.2em',
              fontVariant: 'small-caps'
            }}
          >
            Histoires d'élégance, savoir-faire & inspiration
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={onBack}
          className="absolute top-8 left-8 text-white/70 hover:text-white transition-colors text-sm tracking-wide z-30"
          style={{ fontFamily: 'serif' }}
        >
          ← Back to Home
        </motion.button>
      </motion.section>

      {/* Articles */}
      <section className="bg-white py-32 relative overflow-hidden">
        <ParallaxLayer speed={0.1} className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-white" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {articles.map((article, index) => (
            <ScrollFadeIn
              key={article.id}
              delay={index * 0.2}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40 last:mb-0 ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: index % 2 === 0 ? 5 : -5,
                  rotateX: 3,
                  z: 50
                }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden rounded-lg shadow-2xl ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.1)'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-full w-full relative"
                >
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Luxury Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Golden Accent Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent hover:border-yellow-400/40 transition-colors duration-500 rounded-lg"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 80 : -80, rotateY: index % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`space-y-8 ${
                  index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-sm text-gray-500 tracking-[0.3em] mb-3"
                    style={{ fontFamily: 'serif' }}
                  >
                    {article.subtitle.toUpperCase()}
                  </motion.p>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-5xl text-black mb-6 tracking-wide leading-tight"
                    style={{ fontFamily: 'serif' }}
                  >
                    {article.title}
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg text-gray-600 leading-relaxed mb-8"
                  style={{ fontFamily: 'serif' }}
                >
                  {article.excerpt}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-black tracking-[0.2em] text-sm border-b border-black pb-1 transition-all duration-300 hover:border-gray-400"
                  style={{ fontFamily: 'serif' }}
                >
                  READ MORE
                </motion.button>
              </motion.div>
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-black text-white py-24"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl mb-6 tracking-wide"
            style={{ fontFamily: 'serif' }}
          >
            Stay Informed
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 mb-8 tracking-[0.1em]"
            style={{ fontFamily: 'serif' }}
          >
            Subscribe to receive the latest stories from Maison Élégance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent border border-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-white focus:outline-none"
              style={{ fontFamily: 'serif' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-3 tracking-[0.2em] text-sm transition-all duration-300 hover:bg-gray-100"
              style={{ fontFamily: 'serif' }}
            >
              SUBSCRIBE
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}