import { motion, AnimatePresence } from 'motion/react'
import { X, ShoppingBag, Plus, Minus } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
}

interface MiniCartPreviewProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onCheckout: () => void
  onViewFullCart: () => void
}

export function MiniCartPreview({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onCheckout,
  onViewFullCart 
}: MiniCartPreviewProps) {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Mini Cart Panel */}
          <motion.div
            initial={{ 
              opacity: 0, 
              x: 400, 
              scale: 0.9,
              rotateY: -15
            }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              rotateY: 0
            }}
            exit={{ 
              opacity: 0, 
              x: 400, 
              scale: 0.9,
              rotateY: 15
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="fixed top-0 right-0 h-full w-96 bg-white/95 backdrop-blur-md shadow-2xl z-50 border-l border-gray-200/50"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between p-6 border-b border-gray-200/50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <ShoppingBag className="w-6 h-6 text-gray-800" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-playfair text-black">Shopping Bag</h2>
                  <p className="text-sm text-gray-600 font-cormorant">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
            </motion.div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      layout: { duration: 0.3 }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                    className="flex items-center space-x-4 p-4 bg-white/80 rounded-lg border border-gray-200/50 backdrop-blur-sm"
                  >
                    {/* Product Image */}
                    <motion.div 
                      className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-sm font-playfair text-black line-clamp-2">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-xs text-gray-500 font-cormorant mt-1">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-sm text-gray-800 font-cormorant mt-1">
                        €{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </motion.button>
                      
                      <motion.span 
                        key={item.quantity}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="w-8 text-center text-sm font-cormorant"
                      >
                        {item.quantity}
                      </motion.span>
                      
                      <motion.button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-cormorant">Your bag is empty</p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div 
                className="p-6 border-t border-gray-200/50 bg-white/90 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-playfair text-black">Total</span>
                  <motion.span 
                    key={totalPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-playfair text-black"
                  >
                    €{totalPrice.toLocaleString()}
                  </motion.span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={onViewFullCart}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 border border-gray-300 text-black font-cormorant hover:bg-gray-50 transition-colors rounded-lg"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    VIEW BAG
                  </motion.button>
                  
                  <motion.button
                    onClick={onCheckout}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-black text-white font-cormorant hover:bg-gray-800 transition-colors rounded-lg relative overflow-hidden group"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">CHECKOUT</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}