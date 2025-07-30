"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`gradient-blur ${scrolled ? 'translate-y-0' : 'translate-y-[-100%]'} transition-transform duration-500 ease-in-out`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
            >
              <Logo size="md" />
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#models" className="text-slate-300 hover:text-white transition-colors">
                Models
              </a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                Pricing
              </a>
              <div className="flex items-center space-x-3">
                <Button className="button-secondary">
                  Log in
                </Button>
                <Button className="button-primary">
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </motion.header>
    </>
  );
}