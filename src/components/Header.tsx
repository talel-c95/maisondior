import { motion } from 'motion/react'
import { Search, ShoppingBag, User, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HeaderProps {
  onCategorySelect: (category: string) => void
  cartItems: number
  currentPage: string
  onCartClick?: () => void
}

export function Header({ onCategorySelect, cartItems, currentPage, onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'journal', label: 'Maison Journal' }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 4.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Luxury Logo */}
          <motion.button
            onClick={() => onCategorySelect('home')}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center relative group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.h1 
              className="text-2xl text-black font-playfair"
              style={{ 
                letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Maison
            </motion.h1>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto my-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ width: '80%' }}
            />
            <motion.p 
              className="text-xs text-black font-cormorant -mt-1"
              style={{ 
                fontVariant: 'small-caps',
                letterSpacing: '0.3em',
                color: '#2a2a2a'
              }}
            >
              ÉLÉGANCE
            </motion.p>
          </motion.button>

          {/* Luxury Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                whileHover={{ 
                  y: -3,
                  scale: 1.05
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative text-sm font-cormorant group ${
                  currentPage === category.id ? 'text-black' : 'text-gray-600 hover:text-black'
                }`}
                style={{ 
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                <span className="relative z-10">{category.label}</span>
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-yellow-600 to-transparent"
                  initial={{ width: currentPage === category.id ? '100%' : '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
                {currentPage === category.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-yellow-600 to-transparent"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search size={20} className="text-gray-700" />
            </motion.button>

            <motion.button
              onClick={onCartClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingBag size={20} className="text-gray-700" />
              {cartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartItems}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User size={20} className="text-gray-700" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu size={20} className="text-gray-700" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`block w-full text-left text-sm tracking-wide transition-colors ${
                  currentPage === category.id ? 'text-black' : 'text-gray-600'
                }`}
                style={{ fontFamily: 'serif' }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  )
}