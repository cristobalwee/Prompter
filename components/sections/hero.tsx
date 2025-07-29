"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Paperclip, ArrowUp, ChevronDown } from 'lucide-react';

const models = [
  { id: 'claude-sonnet-3.5', name: 'Claude Sonnet 3.5', provider: 'Anthropic', selected: true },
  { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', selected: true },
  { id: 'llama-3', name: 'LLaMA 3', provider: 'Meta', selected: true },
  { id: 'o3-mini', name: 'O3 Mini', provider: 'OpenAI', selected: true },
];

export function Hero() {
  const [prompt, setPrompt] = useState('You are an extremely knowledgeable fashion assistant...');
  const [selectedModels, setSelectedModels] = useState(models);

  const toggleModel = (modelId: string) => {
    setSelectedModels(prev => 
      prev.map(model => 
        model.id === modelId 
          ? { ...model, selected: !model.selected }
          : model
      )
    );
  };

  const selectedCount = selectedModels.filter(m => m.selected).length;
  const estimatedCost = selectedCount * 0.53; // Example calculation

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Get your prompts{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              right
            </span>
            .
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Test various different LLM's responses to the same prompt side-by-side
          </p>
        </motion.div>

        <motion.div
          className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="min-h-[120px] bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400 text-lg resize-none pr-20"
            />
            
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-400 hover:text-white p-2"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-400">Attach</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-wrap gap-2">
              {selectedModels.map((model) => (
                <Badge
                  key={model.id}
                  variant={model.selected ? "default" : "secondary"}
                  className={`cursor-pointer transition-all ${
                    model.selected 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-slate-600/50 hover:bg-slate-600 text-slate-300'
                  }`}
                  onClick={() => toggleModel(model.id)}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 mr-2" />
                  {model.name}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-400">
                Estimated cost: <span className="text-white font-medium">${estimatedCost.toFixed(2)}</span>
              </span>
              
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-full w-10 h-10 p-0"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}