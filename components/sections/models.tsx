"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, ListFilter } from 'lucide-react';
import { modelData, providerColors } from '@/lib/models';
import Image from 'next/image';

// Helper function to get provider logo
const getProviderLogo = (provider: string) => {
  const logoMap: Record<string, string> = {
    'Anthropic': '/images/anthropic.png',
    'OpenAI': '/images/openAI.png',
    'Meta': '/images/meta.png',
    'Google': '/images/google.png',
  };
  return logoMap[provider] || null;
};

export function ModelsSection() {
  const [filter, setFilter] = useState('all');
  
  const groupedModels = modelData.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, typeof modelData>);

  return (
    <section id="models" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 text-left"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Available Models
          </h2>
          <p className="text-md secondary-text">
            Choose from the latest and most powerful language models from leading AI providers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-end mb-8"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="button-primary text-white">
                <ListFilter className="w-4 h-4" />
                Filter
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="surface-bg border">
              <DropdownMenuItem onClick={() => setFilter('all')}>
                <p>All Models</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('price')}>
                <p>Sort by Price</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('context')}>
                <p>Sort by Context</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('provider')}>
                <p>Sort by Provider</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedModels).map(([provider, models], providerIndex) => {
            const providerLogo = getProviderLogo(provider);
            
            return (
              <motion.div
                key={provider}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: providerIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  {providerLogo ? (
                    <Image
                      src={providerLogo}
                      alt={`${provider} logo`}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain mr-3"
                    />
                  ) : (
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${providerColors[provider as keyof typeof providerColors]} mr-3`} />
                  )}
                  <h3 className="text-2xl font-bold text-white">{provider}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {models.map((model, index) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="transition-all duration-300 group relative">
                        {model.pro && (
                          <Badge className="text-xs highlight-bg absolute top-4 right-4">
                            Pro
                          </Badge>
                        )}
                        <CardHeader className="pb-4">
                          <CardTitle className="text-white text-lg group-hover:text-purple-300 transition-colors">
                            <p>{model.name}</p>
                          </CardTitle>
                          <CardDescription className="text-white">
                            {model.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-300">
                              <span className="secondary-text">Input:</span>
                              <span className="font-medium">{model.inputPrice}/1M tokens</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span className="secondary-text">Output:</span>
                              <span className="font-medium">{model.outputPrice}/1M tokens</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                              <span className="secondary-text">Context Window:</span>
                              <span className="font-medium">{model.contextWindow}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}