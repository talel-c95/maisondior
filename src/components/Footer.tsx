import { motion } from 'motion/react'
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram' },
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' }
  ]

  const footerLinks = {
    'Customer Service': [
      'Contact Us',
      'Size Guide',
      'Shipping & Returns',
      'Care Instructions'
    ],
    'Company': [
      'About Maison Élégance',
      'Careers',
      'Press',
      'Store Locator'
    ],
    'Legal': [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy'
    ]
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-black text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl mb-4 tracking-wide" style={{ fontFamily: 'serif' }}>
            Stay Connected
          </h3>
          <p className="text-gray-400 mb-8 tracking-[0.1em]" style={{ fontFamily: 'serif' }}>
            Subscribe to receive the latest updates and exclusive offers
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-gray-600 pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
                style={{ fontFamily: 'serif' }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-3 tracking-[0.2em] text-sm transition-all duration-300 hover:bg-gray-100"
              style={{ fontFamily: 'serif' }}
            >
              SUBSCRIBE
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-2xl tracking-wide" style={{ fontFamily: 'serif' }}>
                Maison
              </h2>
              <p className="text-lg tracking-[0.2em] -mt-1" style={{ fontFamily: 'serif' }}>
                ÉLÉGANCE
              </p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'serif' }}>
              Timeless elegance meets contemporary sophistication in every piece we create.
            </p>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-sm tracking-[0.2em] text-gray-300" style={{ fontFamily: 'serif' }}>
                {category.toUpperCase()}
              </h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + linkIndex * 0.05 }}
                  >
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                      style={{ fontFamily: 'serif' }}
                    >
                      {link}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'serif' }}>
            © 2024 Maison Élégance. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, label }, index) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 border border-gray-700 hover:border-white rounded-full transition-colors group"
                aria-label={label}
              >
                <Icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}