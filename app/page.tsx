"use client";

import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { ModelsSection } from '@/components/sections/models';
import { PricingSection } from '@/components/sections/pricing';

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <ModelsSection />
      <PricingSection />
      <Footer />
    </div>
  );
}