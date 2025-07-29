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
    description: 'Most capable model'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputPrice: '$5.00',
    outputPrice: '$15.00',
    contextWindow: '128k',
    description: 'Fast and multimodal'
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
];

const providerColors = {
  'Anthropic': 'from-orange-500 to-red-500',
  'OpenAI': 'from-green-500 to-teal-500',
  'Meta': 'from-blue-500 to-purple-500',
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
    <section id="models" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Available Models
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
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
                    <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 hover:border-slate-600 transition-all duration-300 group">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${providerColors[model.provider as keyof typeof providerColors]}`} />
                          <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300">
                            {model.contextWindow} context
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-lg group-hover:text-purple-300 transition-colors">
                          {model.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {model.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-slate-300">
                            <span>Input:</span>
                            <span className="font-medium">{model.inputPrice}/1M tokens</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Output:</span>
                            <span className="font-medium">{model.outputPrice}/1M tokens</span>
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