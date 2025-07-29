"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out the platform',
    icon: Zap,
    features: [
      'One free prompt to 4 models',
      'Basic model selection',
      'Full access to all models',
    ],
    buttonText: 'Get started',
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$10',
    credits: '1000 credits',
    description: 'For regular users and small teams',
    icon: Crown,
    popular: true,
    features: [
      'Covers ~1000 tokens across 4 models',
      'All premium models',
      'Bring your own auth tokens',
      'Full access to all models',
      'No recurring subscription',
      'Priority support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'default' as const,
  },
  {
    name: 'Pro',
    price: '$25',
    credits: '4000 credits',
    description: 'For power users and larger teams',
    icon: Rocket,
    features: [
      'Covers ~3000 tokens across 4 models',
      'All premium models',
      'Bring your own auth tokens',
      'Full access to all models',
      'No recurring subscription',
      'Priority support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'default' as const,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pricing
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Bring your own LLM auth tokens or purchase credits as you go.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            
            return (
              <motion.div
                key={plan.name + plan.price}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <Card className={`h-full ${
                  plan.popular 
                    ? 'bg-slate-800/70 backdrop-blur-lg border-purple-500/50 scale-105' 
                    : 'bg-slate-800/50 backdrop-blur-lg border-slate-700/50'
                } hover:border-slate-600 transition-all duration-300`}>
                  <CardHeader className="text-center pb-8">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white mb-2">{plan.name}</CardTitle>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.credits && (
                        <div className="text-sm text-slate-400 mt-1">
                          {plan.credits}
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-slate-400">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant={plan.buttonVariant}
                      className={`w-full ${
                        plan.buttonVariant === 'default' 
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600' 
                          : 'border-slate-600 text-white hover:bg-slate-700'
                      }`}
                    >
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