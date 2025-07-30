"use client";

import { motion } from 'framer-motion';
import { Logo } from '../ui/logo';

export function Footer() {
  return (
    <footer className="relative surface-hc-bg">
      <div className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between">
            {/* Left section - Logo and Copyright */}
            <motion.div 
              className="flex flex-col space-y-4 mb-8 md:mb-0 justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2">
                <Logo size="md" />
              </div>
              <p className="text-sm text-gray-400">
                Prompter AI 2025, all rights reserved
              </p>
            </motion.div>

            {/* Right section - Navigation columns */}
            <motion.div 
              className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {/* Product Column */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Product</h3>
                <a href="#models" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Available models
                </a>
                <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </div>

              {/* Company Column */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Company</h3>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About the developers
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy policy
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of service
                </a>
              </div>

              {/* Support Column */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Support</h3>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Help center
                </a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}