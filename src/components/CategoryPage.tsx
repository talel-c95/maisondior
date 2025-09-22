import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Filter, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
}

interface CategoryPageProps {
  category: string
  onProductSelect: (product: Product) => void
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Silk Evening Gown',
    price: 2890,
    image: 'https://images.unsplash.com/photo-1580698864216-8008843ce6b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwbW9kZWwlMjBlbGVnYW50fGVufDF8fHx8MTc1ODI3ODQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'women',
    isNew: true
  },
  {
    id: '2',
    name: 'Heritage Leather Handbag',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoYW5kYmFnJTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU4MjY2OTA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'accessories'
  },
  {
    id: '3',
    name: 'Diamond Tennis Bracelet',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1721206625181-e4b529f5afe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwamV3ZWxyeSUyMGx1eHVyeXxlbnwxfHx8fDE3NTgyODc3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'accessories'
  },
  {
    id: '4',
    name: 'Signature Eau de Parfum',
    price: 185,
    image: 'https://images.unsplash.com/photo-1591375275686-e9b036b15f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYmVhdXR5JTIwY29zbWV0aWNzfGVufDF8fHx8MTc1ODI4NzcyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'beauty'
  }
]

export function CategoryPage({ category, onProductSelect }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  const categoryTitles = {
    women: 'Women\'s Collection',
    men: 'Men\'s Collection',
    accessories: 'Accessories',
    beauty: 'Beauty & Fragrance'
  }

  const filteredProducts = mockProducts.filter(product => 
    category === 'all' || product.category === category
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pt-32 pb-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <motion.h1 
            className="text-5xl md:text-7xl text-black mb-6 font-playfair"
            style={{ 
              letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {categoryTitles[category as keyof typeof categoryTitles] || 'All Products'}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mb-4"
          />
          <p className="text-gray-600 font-cormorant text-lg" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {filteredProducts.length} Exquisite Pieces
          </p>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm tracking-wide text-gray-700 hover:text-black transition-colors"
            style={{ fontFamily: 'serif' }}
          >
            <Filter size={16} />
            Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600" style={{ fontFamily: 'serif' }}>Sort by:</span>
            <button className="flex items-center gap-1 text-sm text-black tracking-wide" style={{ fontFamily: 'serif' }}>
              Newest
              <ChevronDown size={14} />
            </button>
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.15 * index,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -20,
                rotateX: 8,
                rotateY: 8,
                scale: 1.05,
                z: 100
              }}
              onClick={() => onProductSelect(product)}
              className="group cursor-pointer relative"
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[3/4] mb-6 group-hover:shadow-2xl transition-shadow duration-500">
                {product.isNew && (
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="absolute top-4 left-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-4 py-2 text-xs font-cormorant z-10"
                    style={{ 
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)'
                    }}
                  >
                    Nouveau
                  </motion.div>
                )}
                
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-full w-full"
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Luxury Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 10px 40px rgba(255,255,255,0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/95 backdrop-blur-sm text-black px-8 py-3 font-cormorant border border-white/20 hover:bg-white transition-all duration-300 overflow-hidden group relative"
                    style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">Discover</span>
                  </motion.button>
                </motion.div>
                
                {/* Subtle Gold Border on Hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/30 transition-colors duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                className="text-center space-y-3"
              >
                <motion.h3 
                  className="text-xl text-black font-playfair group-hover:text-gray-800 transition-colors duration-300"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {product.name}
                </motion.h3>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '40px' }}
                  transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
                  className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto"
                />
                <motion.p 
                  className="text-gray-700 font-cormorant text-lg"
                  style={{ letterSpacing: '0.1em' }}
                >
                  €{product.price.toLocaleString()}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}