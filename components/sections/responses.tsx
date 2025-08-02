"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ImagePlus, ArrowUp, X, Copy, Share, Zap, Check } from 'lucide-react';
import { getAllModels, getModelById } from '@/lib/models';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

// Dummy response data
const dummyResponses = [
  {
    id: 1,
    modelId: 'claude-sonnet-3.5',
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    responseTime: 6.32,
    cost: 0.53
  },
  {
    id: 2,
    modelId: 'claude-opus-4',
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    responseTime: 8.45,
    cost: 0.78
  },
  {
    id: 3,
    modelId: 'llama-3-70b',
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    responseTime: 4.21,
    cost: 0.42
  },
  {
    id: 4,
    modelId: 'gpt-4o',
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    responseTime: 7.89,
    cost: 0.65
  }
];

export function ResponsesSection() {
  const [prompt, setPrompt] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyResponse = (response: string, id: number) => {
    navigator.clipboard.writeText(response);
    setCopiedId(id);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleShareResponses = () => {
    // Implement share functionality
    console.log('Sharing responses...');
  };

  const estimatedCost = dummyResponses.reduce((total, response) => total + response.cost, 0);

  return (
    <div className="min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Responses</h1>
          <Button 
            onClick={handleShareResponses}
            className="button-primary"
          >
            <Share className="w-4 h-4" />
            Share responses
          </Button>
        </div>

        {/* Response Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-[200px]">
          {dummyResponses.map((response) => {
            const model = getModelById(response.modelId);
            const providerLogo = model ? getProviderLogo(model.provider) : null;
            
            return (
              <motion.div
                key={response.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="surface-bg border rounded-lg p-6 h-full flex flex-col justify-between relative gap-10"
              >
                {/* Card Header */}
                <div className="flex items-start justify-start gap-2 flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {providerLogo && (
                        <Image
                          src={providerLogo}
                          alt={`${model?.provider} logo`}
                          width={16}
                          height={16}
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      <p className="text-lg font-bold text-white">
                        {model?.name || 'Unknown Model'}
                      </p>
                    </div>
                  </div>
                  <Button variant="contrast" className="absolute -top-2 -right-2 bg-white p-1 hover:bg-white/60 hover:scale-105 transition-all duration-300">
                    <X className="w-3.5 h-3.5" />
                  </Button>

                  {/* Response Time */}
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 secondary-text" />
                    <span className="text-sm secondary-text">
                      Response time: {response.responseTime}s
                    </span>
                  </div>

                  {/* Response Content */}
                  <div>
                    <p className="text-md text-white">
                      {response.response}
                    </p>
                  </div>
                </div>

                {/* Copy Button */}
                <div className="flex justify-end">
                  <TooltipProvider>
                    <Tooltip open={copiedId === response.id}>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleCopyResponse(response.response, response.id)}
                          className="p-3 relative"
                          title="Copy response"
                        >
                          <motion.div
                            initial={false}
                            animate={{ scale: copiedId === response.id ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {copiedId === response.id ? (
                              <Check className="w-4 h-4 text-black" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </motion.div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        className="bg-black text-white border-black"
                      >
                        <p>Copied!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Prompt Input */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-5xl mx-auto p-0 sm:px-10 sm:pb-6">
          <motion.div
            className="surface-bg border border-r-0 sm:border-r border-l-0 sm:border-l sm:rounded-[28px] overflow-hidden prompt-container"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="min-h-[120px] bg-transparent border-none placeholder:text-slate-400 text-lg resize-none p-6"
              />
            </div>

            <div className="surface-hc-bg flex items-center justify-between p-4">
              <Button 
                size="sm"
                className="button-primary"
              >
                <ImagePlus className="w-3.5 h-3.5" />
                Attach
              </Button>
              
              <div className="flex items-center">
                <Button
                  size="sm"
                  className="bg-[#FFF] hover:opacity-60 hover:scale-105 rounded-full w-11 h-11 p-0 transition-all duration-300"
                >
                  <ArrowUp color='#000' className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 