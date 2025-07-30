"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out the platform.',
    icon: Zap,
    features: [
      'One free prompt to 4 models',
      'Bring your own auth tokens',
      'Access to basic models',
    ],
    buttonText: 'Get started',
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Starter pack',
    price: '$10',
    credits: '1000 credits',
    description: 'For regular users and small teams.',
    icon: Crown,
    features: [
      'Covers ~1000 tokens across 4 models',
      'All premium models',
      'Bring your own auth tokens',
      'No recurring subscription',
    ],
    buttonText: 'Get started',
    buttonVariant: 'default' as const,
  },
  {
    name: 'Pro pack',
    price: '$25',
    credits: '3500 credits',
    description: 'For power users and larger teams.',
    icon: Rocket,
    pro: true,
    features: [
      'Covers ~3000 tokens across 4 models',
      'All premium models',
      'Bring your own auth tokens',
      'No recurring subscription',
      'Priority support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'default' as const,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative mb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Pricing
          </h2>
          <p className="text-lg secondary-text max-w-2xl mx-auto">
            Bring your own LLM auth tokens or purchase credits as you go.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            
            return (
              <motion.div
                key={plan.name + plan.price}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >                
                <Card className="h-full hover:border-slate-600 transition-all duration-300 surface-hc-bg border relative flex flex-col">
                  {plan.pro && (
                    <Badge className="text-xs highlight-bg absolute top-4 right-4">
                      Save 29%
                    </Badge>
                  )}
                  <CardHeader className="pb-5">
                    <span className="text-md text-white mb-4">{plan.name}</span>
                    <div className="mb-2">
                      <CardTitle className="text-5xl text-white mb-2 flex items-end gap-2">
                        {plan.price}
                        {plan.credits && (
                        <p className="text-sm secondary-text font-normal pb-1">
                          / {plan.credits}
                        </p>
                      )}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-white text-md">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 flex flex-grow flex-col justify-between items-start">
                    <ul className="space-y-2.5 mb-12">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 secondary-text mr-3 mt-0.5 flex-shrink-0" />
                          <span className="secondary-text text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button>
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}