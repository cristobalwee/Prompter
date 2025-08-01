"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCases, UseCase, getModelById } from '@/lib/models';
import Image from 'next/image';

interface UseCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseCaseSelect: (modelIds: string[]) => void;
}

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

export function UseCaseModal({ isOpen, onClose, onUseCaseSelect }: UseCaseModalProps) {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const handleUseCaseSelect = (useCase: UseCase) => {
    onUseCaseSelect(useCase.modelIds);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="surface-bg border border-[#404040] rounded-[28px] p-6 md:p-10 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between text-left pr-12">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  We'll help you pick
                </h2>
                <p className="secondary-text">
                  Select the use case that best matches your needs.
                </p>
              </div>
              <Button
                variant="contrast"
                size="sm"
                onClick={onClose}
                className="text-black bg-white hover:bg-white/50 rounded-full p-3 absolute top-6 right-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Use Cases Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((useCase) => {
                const models = useCase.modelIds.map(id => getModelById(id)).filter(Boolean);
                
                return (
                  <motion.div
                    key={useCase.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="action-bg border border-[#404040] rounded-[16px] p-6 cursor-pointer hover:border-[#606060] transition-all duration-200 justify-between gap-6 flex flex-col"
                    onClick={() => handleUseCaseSelect(useCase)}
                  >
                    {/* Use Case Header */}
                    <div className="flex items-start gap-3 mb-4 text-left">
                      <div>
                        <h3 className="font-semibold text-white text-lg">
                          {useCase.title}
                        </h3>
                        <p className="secondary-text text-md leading-tight">
                          {useCase.description}
                        </p>
                      </div>
                    </div>

                    {/* Model Logos */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center -space-x-2">
                        {models.map((model, index) => {
                          const logo = model ? getProviderLogo(model.provider) : null;
                          const uniqueId = `${useCase.id}-${model?.id}-${index}`;
                          
                          return (
                            <div 
                              key={uniqueId} 
                              className="rounded-full flex items-center justify-center relative group"
                              onMouseEnter={() => setHoveredModel(uniqueId)}
                              onMouseLeave={() => setHoveredModel(null)}
                            >
                              {logo ? (
                                <Image
                                  src={logo}
                                  alt={`${model?.provider} logo`}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 object-contain"
                                />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                              )}
                              
                              {/* Tooltip */}
                              <AnimatePresence>
                                {hoveredModel === uniqueId && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute bottom-full mb-2 px-3 py-2 bg-black/90 backdrop-blur-sm border border-[#404040] rounded-lg text-white text-sm font-medium whitespace-nowrap z-10 pointer-events-none"
                                  >
                                    {model?.name}
                                    {/* Tooltip arrow */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                      <p className="secondary-text text-right text-sm">800 credits/prompt</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 