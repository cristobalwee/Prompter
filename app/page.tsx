"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { ModelsSection } from '@/components/sections/models';
import { PricingSection } from '@/components/sections/pricing';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { Starfield } from '@/components/ui/starfield';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-x-hidden">
      <Starfield />
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <ModelsSection />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}