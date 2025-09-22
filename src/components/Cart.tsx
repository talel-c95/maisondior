import { motion, AnimatePresence } from 'motion/react'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onCheckout: () => void
}

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 25
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%', rotateY: -15 }}
            animate={{ x: 0, rotateY: 0 }}
            exit={{ x: '100%', rotateY: -15 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              damping: 25,
              stiffness: 200
            }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-between p-6 border-b"
              >
                <h2 className="text-xl tracking-wide" style={{ fontFamily: 'serif' }}>
                  Shopping Cart ({items.length})
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </motion.button>
              </motion.div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence>
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-16"
                    >
                      <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 tracking-[0.1em]" style={{ fontFamily: 'serif' }}>
                        Your cart is empty
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 100, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          layout
                          className="flex gap-4 group"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-20 h-20 bg-gray-50 overflow-hidden"
                          >
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>

                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="text-sm tracking-wide" style={{ fontFamily: 'serif' }}>
                                {item.name}
                              </h3>
                              {item.size && (
                                <p className="text-xs text-gray-500" style={{ fontFamily: 'serif' }}>
                                  Size: {item.size}
                                </p>
                              )}
                              <p className="text-sm text-gray-700" style={{ fontFamily: 'serif' }}>
                                €{item.price.toLocaleString()}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                  className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                                >
                                  <Minus size={12} />
                                </motion.button>
                                
                                <span className="w-8 text-center text-sm" style={{ fontFamily: 'serif' }}>
                                  {item.quantity}
                                </span>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center border border-gray-300 hover:border-black transition-colors"
                                >
                                  <Plus size={12} />
                                </motion.button>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemove(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors text-xs"
                              >
                                Remove
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="border-t p-6 space-y-4"
                >
                  <div className="space-y-2 text-sm" style={{ fontFamily: 'serif' }}>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>€{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `€${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-lg border-t pt-2">
                      <span>Total</span>
                      <span>€{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCheckout}
                    className="w-full bg-black text-white py-4 tracking-[0.2em] text-sm transition-all duration-300 hover:bg-gray-900"
                    style={{ fontFamily: 'serif' }}
                  >
                    PROCEED TO CHECKOUT
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center" style={{ fontFamily: 'serif' }}>
                    Free shipping on orders over €500
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}