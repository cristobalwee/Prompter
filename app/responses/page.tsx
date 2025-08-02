"use client";

import { Header } from '@/components/layout/header';
import { ResponsesSection } from '@/components/sections/responses';
import { AnimatedBackground } from '@/components/ui/animated-background';

export default function ResponsesPage() {
  return (
    <div className="relative overflow-x-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Header />
        <main>
          <ResponsesSection />
        </main>
      </div>
    </div>
  );
} 