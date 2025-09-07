"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

type AuthMode = 'signin' | 'signup' | 'confirm' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  });
  const [pendingUsername, setPendingUsername] = useState('');

  const { signIn, signUp, confirmSignUp, forgotPassword, confirmForgotPassword, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      switch (mode) {
        case 'signin':
          await signIn(formData.username, formData.password);
          toast.success('Signed in successfully!');
          onClose();
          break;

        case 'signup':
          if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
          }
          await signUp(formData.username, formData.email, formData.password);
          setPendingUsername(formData.username);
          setMode('confirm');
          toast.success('Account created! Please check your email for verification code.');
          break;

        case 'confirm':
          await confirmSignUp(pendingUsername, formData.code);
          toast.success('Account confirmed! You can now sign in.');
          setMode('signin');
          break;

        case 'forgot':
          await forgotPassword(formData.username);
          setPendingUsername(formData.username);
          setMode('confirm');
          toast.success('Password reset code sent to your email.');
          break;
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast.error(error.message || 'Google sign in failed');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
    });
  };

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md surface-bg rounded-lg shadow-xl border"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="contrast"
              size="sm"
              onClick={onClose}
              className="text-black bg-white hover:bg-white/50 rounded-full p-2 absolute top-4 right-4"
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                {mode === 'signin' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'confirm' && 'Verify Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>

              {mode === 'signin' && (
                <>
                  {/* Google Sign In Button */}
                  <Button
                    onClick={handleGoogleSignIn}
                    className="w-full mb-4 bg-white text-gray-900 hover:bg-gray-100 border border-gray-300"
                  >
                    <img src="/images/google.png" alt="Google" className="w-5 h-5 mr-2" />
                    Continue with Google
                  </Button>

                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="px-2 secondary-text">Or continue with</span>
                    </div>
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signin' && (
                  <>
                    <div>
                      <Label htmlFor="username" className="text-slate-300">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-slate-300">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </>
                )}

                {mode === 'signup' && (
                  <>
                    <div>
                      <Label htmlFor="username" className="text-slate-300">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="mt-1 bg-slate-800 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-1 bg-slate-800 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-slate-300">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="mt-1 bg-slate-800 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="mt-1 bg-slate-800 border-slate-600 text-white"
                        required
                      />
                    </div>
                  </>
                )}

                {mode === 'confirm' && (
                  <div>
                    <Label htmlFor="code" className="text-slate-300">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      className="mt-1 bg-slate-800 border-slate-600 text-white"
                      placeholder="Enter the code from your email"
                      required
                    />
                  </div>
                )}

                {mode === 'forgot' && (
                  <div>
                    <Label htmlFor="username" className="text-slate-300">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="mt-1 bg-slate-800 border-slate-600 text-white"
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : (
                    mode === 'signin' ? 'Sign In' :
                    mode === 'signup' ? 'Create Account' :
                    mode === 'confirm' ? 'Verify' :
                    'Send Reset Code'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                {mode === 'signin' && (
                  <div className="space-y-2">
                    <p className="text-slate-400">
                      Don't have an account?{' '}
                      <button
                        onClick={() => handleModeChange('signup')}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Sign up
                      </button>
                    </p>
                    <p className="text-slate-400">
                      <button
                        onClick={() => handleModeChange('forgot')}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </p>
                  </div>
                )}

                {mode === 'signup' && (
                  <p className="text-slate-400">
                    Already have an account?{' '}
                    <button
                      onClick={() => handleModeChange('signin')}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Sign in
                    </button>
                  </p>
                )}

                {mode === 'confirm' && (
                  <p className="text-slate-400">
                    <button
                      onClick={() => handleModeChange('signin')}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Back to sign in
                    </button>
                  </p>
                )}

                {mode === 'forgot' && (
                  <p className="text-slate-400">
                    <button
                      onClick={() => handleModeChange('signin')}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Back to sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 