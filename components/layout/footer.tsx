"use client";

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2 mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">prompter</span>
          </motion.div>

          <motion.nav 
            className="flex items-center space-x-8 mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <a href="#models" className="text-slate-400 hover:text-white transition-colors">
              Models
            </a>
            <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              About the developers
            </a>
          </motion.nav>

          <motion.p 
            className="text-slate-400 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Prompter AI 2024. All rights reserved
          </motion.p>
        </div>
      </div>
    </footer>
  );
}