"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

const modelData = [
  {
    id: 'claude-sonnet-3.5',
    name: 'Claude Sonnet 3.5',
    provider: 'Anthropic',
    inputPrice: '$4.00',
    outputPrice: '$20.00',
    contextWindow: '200k',
    description: 'Balanced performance and speed'
  },
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    inputPrice: '$15.00',
    outputPrice: '$75.00',
    contextWindow: '200k',
    description: 'Most capable model',
    pro: true,
  },
  {
    id: 'claude-haiku-3',
    name: 'Claude Haiku 3',
    provider: 'Anthropic',
    inputPrice: '$0.25',
    outputPrice: '$1.25',
    contextWindow: '200k',
    description: 'Fastest and most affordable'
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    inputPrice: '$8.00',
    outputPrice: '$40.00',
    contextWindow: '200k',
    description: 'Next generation Sonnet',
    pro: true,
  },
  {
    id: 'claude-opus-3.5',
    name: 'Claude Opus 3.5',
    provider: 'Anthropic',
    inputPrice: '$12.00',
    outputPrice: '$60.00',
    contextWindow: '200k',
    description: 'Enhanced reasoning capabilities',
    pro: true,
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputPrice: '$5.00',  
    outputPrice: '$15.00',
    contextWindow: '128k',
    description: 'Fast and multimodal',
    pro: true,
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    inputPrice: '$10.00',
    outputPrice: '$30.00',
    contextWindow: '128k',
    description: 'Latest GPT-4 model'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    inputPrice: '$0.50',
    outputPrice: '$1.50',
    contextWindow: '16k',
    description: 'Cost-effective and reliable'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    inputPrice: '$0.15',
    outputPrice: '$0.60',
    contextWindow: '128k',
    description: 'Compact and efficient'
  },
  {
    id: 'gpt-4-turbo-preview',
    name: 'GPT-4 Turbo Preview',
    provider: 'OpenAI',
    inputPrice: '$8.00',
    outputPrice: '$24.00',
    contextWindow: '128k',
    description: 'Latest preview features'
  },
  {
    id: 'gpt-4-vision',
    name: 'GPT-4 Vision',
    provider: 'OpenAI',
    inputPrice: '$10.00',
    outputPrice: '$30.00',
    contextWindow: '128k',
    description: 'Multimodal with vision',
    pro: true,
  },
  {
    id: 'llama-3-70b',
    name: 'LLaMA 3 70B',
    provider: 'Meta',
    inputPrice: '$0.90',
    outputPrice: '$0.90',
    contextWindow: '8k',
    description: 'Open source excellence'
  },
  {
    id: 'llama-3-8b',
    name: 'LLaMA 3 8B',
    provider: 'Meta',
    inputPrice: '$0.20',
    outputPrice: '$0.20',
    contextWindow: '8k',
    description: 'Fast and efficient'
  },
  {
    id: 'llama-3-400b',
    name: 'LLaMA 3 400B',
    provider: 'Meta',
    inputPrice: '$2.50',
    outputPrice: '$2.50',
    contextWindow: '32k',
    description: 'Largest open model',
    pro: true,
  },
  {
    id: 'llama-3-1b',
    name: 'LLaMA 3 1B',
    provider: 'Meta',
    inputPrice: '$0.05',
    outputPrice: '$0.05',
    contextWindow: '8k',
    description: 'Ultra-lightweight model'
  },
  {
    id: 'llama-3-405b',
    name: 'LLaMA 3 405B',
    provider: 'Meta',
    inputPrice: '$3.00',
    outputPrice: '$3.00',
    contextWindow: '32k',
    description: 'Latest large model',
    pro: true,
  },
  {
    id: 'llama-3-codellama',
    name: 'Code Llama 3',
    provider: 'Meta',
    inputPrice: '$1.50',
    outputPrice: '$1.50',
    contextWindow: '16k',
    description: 'Specialized for coding'
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    inputPrice: '$3.50',
    outputPrice: '$10.50',
    contextWindow: '1M',
    description: 'Million-token context',
    pro: true,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    inputPrice: '$0.75',
    outputPrice: '$2.25',
    contextWindow: '1M',
    description: 'Fast with long context'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    inputPrice: '$1.50',
    outputPrice: '$4.50',
    contextWindow: '32k',
    description: 'Balanced performance'
  },
  {
    id: 'gemini-1.5-pro-latest',
    name: 'Gemini 1.5 Pro Latest',
    provider: 'Google',
    inputPrice: '$4.00',
    outputPrice: '$12.00',
    contextWindow: '1M',
    description: 'Latest with enhanced features',
    pro: true,
  },
  {
    id: 'gemini-nano',
    name: 'Gemini Nano',
    provider: 'Google',
    inputPrice: '$0.25',
    outputPrice: '$0.75',
    contextWindow: '32k',
    description: 'On-device processing'
  },
  {
    id: 'gemini-vision',
    name: 'Gemini Vision',
    provider: 'Google',
    inputPrice: '$2.00',
    outputPrice: '$6.00',
    contextWindow: '32k',
    description: 'Multimodal with vision',
    pro: true,
  },
];

const providerColors = {
  'Anthropic': 'from-orange-500 to-red-500',
  'OpenAI': 'from-green-500 to-teal-500',
  'Meta': 'from-blue-500 to-purple-500',
  'Google': 'from-blue-500 to-indigo-500',
  'Mistral AI': 'from-purple-500 to-pink-500',
  'Cohere': 'from-emerald-500 to-cyan-500',
  'Perplexity': 'from-violet-500 to-purple-500',
  'DeepSeek': 'from-yellow-500 to-orange-500',
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
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="price">Sort by Price</SelectItem>
              <SelectItem value="context">Sort by Context</SelectItem>
              <SelectItem value="provider">Sort by Provider</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedModels).map(([provider, models], providerIndex) => (
            <motion.div
              key={provider}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: providerIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${providerColors[provider as keyof typeof providerColors]} mr-3`} />
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
          ))}
        </div>
      </div>
    </section>
  );
}