import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Heart, ShoppingBag, RotateCcw, ArrowLeft, ZoomIn } from 'lucide-react'
import { useState } from 'react'
import { ProductRotation360 } from './ProductRotation360'
import { ScrollPanel, ParallaxLayer, ScrollFadeIn } from './ScrollAnimations'
import { useRippleEffect } from './CursorEffects'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
}

interface ProductDetailProps {
  product: Product | null
  onBack: () => void
  onAddToCart: (product: Product) => void
}

export function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [is360View, setIs360View] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const { createRipple, RippleEffect } = useRippleEffect()

  if (!product) return null

  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  // Mock 360° images - in real app, these would be different angles
  const product360Images = Array.from({ length: 8 }, () => product.image)
  
  const relatedProducts = [
    {
      id: 'related-1',
      name: 'Silk Scarf',
      price: 285,
      image: 'https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU4MjY2OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'related-2',
      name: 'Pearl Earrings',
      price: 450,
      image: 'https://images.unsplash.com/photo-1721206625181-e4b529f5afe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwamV3ZWxyeSUyMGx1eHVyeXxlbnwxfHx8fDE3NTgyODc3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-32 pb-16 relative overflow-x-hidden"
    >
      <ParallaxLayer speed={0.1} className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <ScrollFadeIn className="mb-8">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors font-cormorant text-lg relative overflow-hidden group"
            style={{ letterSpacing: '0.05em' }}
            onMouseDown={createRipple}
          >
            <RippleEffect />
            <ArrowLeft size={18} />
            <span className="relative z-10">Return to Collection</span>
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-yellow-600 to-transparent"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Gallery */}
          <ScrollPanel className="space-y-6">
            {is360View ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <ProductRotation360
                  images={product360Images}
                  productName={product.name}
                  className="w-full"
                />
                <motion.button
                  onClick={() => setIs360View(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full py-3 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors font-cormorant"
                  style={{ letterSpacing: '0.1em' }}
                >
                  Exit 360° View
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Main Image with Zoom */}
                <motion.div
                  className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden group cursor-zoom-in"
                  whileHover={{ 
                    scale: isZoomed ? 1 : 1.02,
                    rotateY: 3,
                    rotateX: 1
                  }}
                  onClick={() => setIsZoomed(!isZoomed)}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: isZoomed ? 1.5 : 1,
                      filter: isZoomed ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
                    }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full w-full"
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Luxury Lighting Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none"
                    animate={{ 
                      opacity: isZoomed ? 0.6 : 0.3,
                      background: isZoomed 
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(212,175,55,0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
                    }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Control Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIs360View(true)
                      }}
                      className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20 group"
                    >
                      <RotateCcw size={16} className="text-gray-700 group-hover:text-yellow-600 transition-colors" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/20 group"
                    >
                      <ZoomIn size={16} className="text-gray-700 group-hover:text-yellow-600 transition-colors" />
                    </motion.button>
                  </div>

                  {/* Zoom Indicator */}
                  {isZoomed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-cormorant backdrop-blur-sm"
                    >
                      Click to zoom out
                    </motion.div>
                  )}
                </motion.div>
              </>
            )}

            {/* Thumbnail Gallery */}
            {!is360View && (
              <motion.div 
                className="grid grid-cols-4 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {[1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.1, 
                      rotateY: 5,
                      z: 20
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer rounded-lg overflow-hidden border border-gray-200/50 group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={`${product.name} view ${index}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </ScrollPanel>

          {/* Product Info */}
          <ScrollFadeIn delay={0.2} className="space-y-8">
            <div>
              {product.isNew && (
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-block bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-6 py-2 font-cormorant mb-6"
                  style={{ 
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
                  }}
                >
                  Nouvelle Collection
                </motion.div>
              )}
              
              <motion.h1 
                className="text-4xl md:text-6xl text-black mb-6 font-playfair leading-tight"
                style={{ 
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {product.name}
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-px bg-gradient-to-r from-yellow-600 to-transparent mb-6"
              />
              
              <motion.p 
                className="text-3xl text-gray-900 mb-8 font-cormorant"
                style={{ letterSpacing: '0.05em' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                €{product.price.toLocaleString()}
              </motion.p>

              <motion.p 
                className="text-gray-600 leading-relaxed mb-8 font-cormorant text-lg"
                style={{ lineHeight: '1.8' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Crafted from the finest materials with meticulous attention to detail. 
                This piece embodies the essence of Maison Élégance - where timeless sophistication 
                meets contemporary elegance in perfect harmony.
              </motion.p>
            </div>

            {/* Size Selection */}
            {product.category !== 'beauty' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h3 className="text-sm font-cormorant text-gray-700 mb-6" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Taille / Size
                </h3>
                <div className="flex gap-3">
                  {sizes.map((size, index) => (
                    <motion.button
                      key={size}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotateY: 10,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      onMouseDown={createRipple}
                      className={`relative w-14 h-14 border-2 font-cormorant text-lg transition-all duration-500 overflow-hidden ${
                        selectedSize === size
                          ? 'border-black bg-black text-white shadow-lg'
                          : 'border-gray-300 hover:border-yellow-600 hover:text-yellow-600'
                      }`}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        letterSpacing: '0.05em'
                      }}
                    >
                      <RippleEffect />
                      <span className="relative z-10">{size}</span>
                      {selectedSize === size && (
                        <motion.div
                          layoutId="sizeSelector"
                          className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-transparent"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAddToCart(product)}
                onMouseDown={createRipple}
                className="relative w-full bg-black text-white py-5 px-8 font-cormorant text-lg hover:bg-gray-900 transition-all duration-500 overflow-hidden group"
                style={{ letterSpacing: '0.15em' }}
              >
                <RippleEffect />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <ShoppingBag size={18} />
                  <span>Ajouter au Panier</span>
                </div>
              </motion.button>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: isWishlisted ? '#ef4444' : '#d4af37'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  onMouseDown={createRipple}
                  className={`relative flex-1 border-2 py-4 px-6 font-cormorant text-sm transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50/50'
                      : 'border-gray-300 text-gray-700 hover:border-yellow-600 hover:text-yellow-600'
                  }`}
                  style={{ letterSpacing: '0.1em' }}
                >
                  <RippleEffect />
                  <motion.div
                    animate={{ 
                      scale: isWishlisted ? [1, 1.2, 1] : 1,
                      rotate: isWishlisted ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </motion.div>
                  <span className="relative z-10">
                    {isWishlisted ? 'Dans la Liste' : 'Liste de Souhaits'}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: '#d4af37'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onMouseDown={createRipple}
                  className="relative flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 font-cormorant text-sm transition-all duration-500 hover:border-yellow-600 hover:text-yellow-600 overflow-hidden"
                  style={{ letterSpacing: '0.1em' }}
                >
                  <RippleEffect />
                  <span className="relative z-10">Réserver en Boutique</span>
                </motion.button>
              </div>
            </motion.div>
          </ScrollFadeIn>
        </div>

        {/* Complete the Look */}
        <ScrollFadeIn className="mt-32">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl text-black mb-6 font-playfair"
              style={{ 
                letterSpacing: '0.05em',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Complétez le Look
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '150px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {relatedProducts.map((item, index) => (
              <ScrollPanel key={item.id} className="group cursor-pointer">
                <motion.div
                  initial={{ opacity: 0, y: 60, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -20,
                    rotateX: 8,
                    rotateY: 8,
                    scale: 1.05,
                    z: 100
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative"
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 mb-6 overflow-hidden rounded-lg group-hover:shadow-2xl transition-shadow duration-500">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="h-full w-full"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Luxury Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    >
                      <motion.button
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: '0 10px 40px rgba(255,255,255,0.3)'
                        }}
                        className="bg-white/95 backdrop-blur-sm text-black px-8 py-3 font-cormorant border border-white/20 hover:bg-white transition-all duration-300"
                        style={{ letterSpacing: '0.15em' }}
                      >
                        Découvrir
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <motion.h3 
                      className="text-xl text-black font-playfair group-hover:text-gray-800 transition-colors duration-300"
                      style={{ letterSpacing: '0.05em' }}
                    >
                      {item.name}
                    </motion.h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '40px' }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto"
                    />
                    <p className="text-gray-700 font-cormorant text-lg" style={{ letterSpacing: '0.1em' }}>
                      €{item.price}
                    </p>
                  </div>
                </motion.div>
              </ScrollPanel>
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </motion.div>
  )
}