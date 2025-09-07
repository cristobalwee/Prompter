import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { Header } from '@/components/layout/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prompter - Get your prompts right',
  description: 'Test various different LLM responses to the same prompt side-by-side. Compare Claude, GPT-4, LLaMA, and more.',
  keywords: 'AI, LLM, prompt testing, AI comparison, Claude, GPT-4, LLaMA',
  authors: [{ name: 'Prompter Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <AnimatedBackground />
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}