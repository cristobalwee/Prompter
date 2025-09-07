"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signUp, signOut, confirmSignUp, resetPassword, confirmResetPassword, getCurrentUser, signInWithRedirect, fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser as getCurrentUserFromRedirect, fetchUserAttributes } from 'aws-amplify/auth';
import type { AuthUser } from 'aws-amplify/auth';
import '@/lib/aws-config';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  confirmSignUp: (username: string, code: string) => Promise<void>;
  forgotPassword: (username: string) => Promise<void>;
  confirmForgotPassword: (username: string, code: string, newPassword: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Only check auth state on client side
      if (typeof window !== 'undefined') {
        // Check if user is returning from OAuth redirect
        try {
          const currentUser = await getCurrentUserFromRedirect();
          setUser(currentUser);
        } catch (error) {
          // If no redirect user, try to get current user normally
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signInUser = async (username: string, password: string) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else {
        // Handle cases where additional steps are required
        console.log('Sign in next step:', nextStep);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Sign in failed');
    }
  };

  const signInWithGoogleUser = async () => {
    try {
      await signInWithRedirect();
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error(error.message || 'Google sign in failed');
    }
  };

  const signUpUser = async (username: string, email: string, password: string) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      console.log('Sign up result:', { isSignUpComplete, userId, nextStep });
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Sign up failed');
    }
  };

  const confirmSignUpUser = async (username: string, code: string) => {
    try {
      await confirmSignUp({ username, confirmationCode: code });
    } catch (error) {
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const forgotPasswordUser = async (username: string) => {
    try {
      await resetPassword({ username });
    } catch (error) {
      throw error;
    }
  };

  const confirmForgotPasswordUser = async (username: string, code: string, newPassword: string) => {
    try {
      await confirmResetPassword({ username, confirmationCode: code, newPassword });
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn: signInUser,
    signUp: signUpUser,
    signOut: signOutUser,
    confirmSignUp: confirmSignUpUser,
    forgotPassword: forgotPasswordUser,
    confirmForgotPassword: confirmForgotPasswordUser,
    signInWithGoogle: signInWithGoogleUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 