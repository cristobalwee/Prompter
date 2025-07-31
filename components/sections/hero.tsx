"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ImagePlus, ArrowUp, ChevronDown } from 'lucide-react';
import { ModelSelector } from '@/components/ui/model-selector';
import { getAllModels, getModelById } from '@/lib/models';
import Image from 'next/image';

const allModels = getAllModels();

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

export function Hero() {
  const [prompt, setPrompt] = useState('');
  const [modelSlots, setModelSlots] = useState([
    { id: 1, modelId: 'claude-sonnet-3.5' },
    { id: 2, modelId: 'claude-opus-4' },
    { id: 3, modelId: 'llama-3-70b' },
    { id: 4, modelId: 'gpt-4o' },
  ]);

  const setModelForSlot = (slotId: number, modelId: string | null) => {
    setModelSlots(prev => 
      prev.map(slot => 
        slot.id === slotId 
          ? { ...slot, modelId: modelId || '' }
          : slot
      )
    );
  };

  const clearSlot = (slotId: number) => {
    setModelForSlot(slotId, null);
  };

  // Get all selected models across all slots
  const allSelectedModels = modelSlots
    .map(slot => getModelById(slot.modelId))
    .filter((model): model is NonNullable<typeof model> => model !== null && model !== undefined);

  const estimatedCost = modelSlots.length * 0.53; // Example calculation

  return (
    <section className="relative mt-[20vh] mb-20 flex items-center justify-center px-4 pt-16">
      <div className="mx-auto text-center w-[75vw] max-w-[896px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Get your prompts right.
          </h1>
          
          <p className="text-lg secondary-text mb-12 mx-auto">
          Test up to 4 different LLM's responses to the same prompt side-by-side within 30 seconds.
          </p>
        </motion.div>

        <motion.div
          className="surface-bg border rounded-[28px] mb-8 overflow-hidden w-full prompt-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="You are an extremely knowledgeable fashion assistant..."
              className="min-h-[200px] bg-transparent border-none placeholder:text-slate-400 text-lg resize-none p-7 pr-[120px]"
            />
            
            <div className="absolute top-5 right-5 flex items-center space-x-2">
              <Button 
                size="sm"
              >
                <ImagePlus className="w-3.5 h-3.5" />
                Attach
              </Button>
            </div>
          </div>

          <div className="surface-hc-bg flex items-center justify-between mt-6 p-4">
            <div className="flex flex-wrap gap-2">
              {modelSlots.map((slot) => {
                const model = getModelById(slot.modelId);
                const providerLogo = model ? getProviderLogo(model.provider) : null;
                
                return (
                  <ModelSelector
                    key={slot.id}
                    models={allModels}
                    selectedModels={model ? [model] : []}
                    onModelToggle={(modelId) => setModelForSlot(slot.id, modelId)}
                    allSelectedModels={allSelectedModels}
                    currentSlotModelId={slot.modelId}
                    clearSlot={() => clearSlot(slot.id)}
                    trigger={
                      <Button className={`${model ? 'button-primary' : 'button-secondary'} text-white dash-border px-1.5`}>
                        {model && providerLogo ? (
                          <Image
                            src={providerLogo}
                            alt={`${model.provider} logo`}
                            width={16}
                            height={16}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <div className="w-2 h-2 ml-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                        )}
                        {model?.name || 'Select Model'}
                        <ChevronDown className="w-3 h-3 mr-1" />
                      </Button>
                    }
                  />
                );
              })}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                className="bg-[#FFF] hover:opacity-80 rounded-full w-11 h-11 p-0"
              >
                <ArrowUp color='#000' className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}