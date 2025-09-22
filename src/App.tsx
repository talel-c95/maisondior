import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { IntroAnimation } from './components/IntroAnimation'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { CategoryPage } from './components/CategoryPage'
import { ProductDetail } from './components/ProductDetail'
import { Journal } from './components/Journal'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'
import { MiniCartPreview } from './components/MiniCartPreview'
import { LuxuryCursor } from './components/CursorEffects'
import { ParticleBackground, LuxuryBackgroundGradient } from './components/ParticleBackground'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
}

interface CartItem extends Product {
  quantity: number
  size?: string
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false)

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  const handleCategorySelect = (category: string) => {
    setCurrentPage(category)
    setSelectedProduct(null)
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setCurrentPage('product')
  }

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...product, quantity: 1, size: 'M' }]
      }
    })
    setIsMiniCartOpen(true)
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id)
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    // Mock checkout process
    alert('Thank you for your order! This is a demo checkout.')
    setCartItems([])
    setIsCartOpen(false)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HeroSection onCategorySelect={handleCategorySelect} />
      
      case 'journal':
        return <Journal onBack={() => setCurrentPage('home')} />
      
      case 'product':
        return (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentPage('women')}
            onAddToCart={handleAddToCart}
          />
        )
      
      case 'men':
      case 'women':
      case 'accessories':
      case 'beauty':
        return (
          <CategoryPage
            category={currentPage}
            onProductSelect={handleProductSelect}
          />
        )
      
      default:
        return <HeroSection onCategorySelect={handleCategorySelect} />
    }
  }

  // Prevent scrolling during intro
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showIntro])

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroAnimation key="intro" onComplete={handleIntroComplete} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Luxury Cursor */}
            <LuxuryCursor />
            
            {/* Background Effects */}
            <LuxuryBackgroundGradient className="fixed inset-0 z-0" />
            <ParticleBackground count={30} className="fixed inset-0 z-0" />

            {/* Header */}
            <Header
              onCategorySelect={handleCategorySelect}
              cartItems={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              currentPage={currentPage}
              onCartClick={() => setIsMiniCartOpen(true)}
            />

            {/* Main Content */}
            <main className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage + (selectedProduct?.id || '')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Footer - Only show on home and category pages */}
            {(currentPage === 'home' || ['men', 'women', 'accessories', 'beauty'].includes(currentPage)) && (
              <Footer />
            )}

            {/* Mini Cart Preview */}
            <MiniCartPreview
              isOpen={isMiniCartOpen}
              onClose={() => setIsMiniCartOpen(false)}
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
              onViewFullCart={() => {
                setIsMiniCartOpen(false)
                setIsCartOpen(true)
              }}
            />

            {/* Full Cart */}
            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
              onCheckout={handleCheckout}
            />

            {/* Floating Cart Button */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: cartItems.length > 0 ? 1 : 0, 
                opacity: cartItems.length > 0 ? 1 : 0 
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={() => setIsMiniCartOpen(true)}
              className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-2xl z-40 border border-gray-800 backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: cartItems.length > 0 ? [0, 10, -10, 0] : 0
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: cartItems.length > 0 ? Infinity : 0,
                  repeatDelay: 2
                }}
                className="w-6 h-6 flex items-center justify-center relative"
              >
                <span className="text-sm font-cormorant">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
                {cartItems.length > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}