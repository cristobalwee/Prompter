"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { AuthModal } from '@/components/auth/auth-modal';
import { useAuth } from '@/lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { isAuthenticated, isLoading, signOut, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const getUsername = () => {
    if (user?.signInDetails?.loginId) {
      return user.signInDetails.loginId;
    }
    if (user?.username) {
      return user.username;
    }
    return 'User';
  };

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
              
              {/* Auth Buttons */}
              {!isLoading && (
                <div className="flex items-center space-x-3">
                  {isAuthenticated ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="flex items-center space-x-2">
                          <User size={16} />
                          <span className="text-sm">{getUsername()}</span>
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          My Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut size={16} className="mr-2" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Button 
                        className="button-secondary"
                        onClick={() => handleAuthClick('signin')}
                      >
                        Log in
                      </Button>
                      <Button 
                        className="button-primary"
                        onClick={() => handleAuthClick('signup')}
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}