"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ImagePlus, ArrowUp, ChevronDown, X, ArrowRight } from 'lucide-react';
import { ModelSelector } from '@/components/ui/model-selector';
import { getAllModels, getModelById } from '@/lib/models';
import { UseCaseModal } from '@/components/ui/use-case-modal';
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

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  name: string;
}

export function Hero() {
  const [prompt, setPrompt] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUseCaseModalOpen, setIsUseCaseModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleUseCaseSelect = (modelIds: string[]) => {
    // Apply the selected models to the slots
    const newModelSlots = modelSlots.map((slot, index) => ({
      ...slot,
      modelId: modelIds[index] || slot.modelId
    }));
    setModelSlots(newModelSlots);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          name: file.name,
        };
        setUploadedFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });

    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          name: file.name,
        };
        setUploadedFiles(prev => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Get all selected models across all slots
  const allSelectedModels = modelSlots
    .map(slot => getModelById(slot.modelId))
    .filter((model): model is NonNullable<typeof model> => model !== null && model !== undefined);

  const estimatedCost = modelSlots.length * 0.53; // Example calculation

  return (
    <section className="relative mt-[20vh] mb-20 flex items-center justify-center px-4 pt-16">
      <div className="mx-auto text-center w-[75vw] max-w-[896px] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Get your prompts right.
          </h1>
          
          <p className="text-lg secondary-text mb-12 mx-auto">
          Compare models to improve your prompts and find the perfect AI voice, all within a few clicks.
          </p>
        </motion.div>

        <motion.div
          className={`surface-bg border rounded-[28px] mb-8 overflow-hidden w-full prompt-container relative`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Drag overlay */}
          <div className={`absolute inset-0 bg-[#1B1B1B]/80 border-1 border-blue-400 rounded-[28px] flex items-center justify-center z-10 ${isDragOver ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 pointer-events-none`}>
            <div className="text-center flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center bg-white rounded-full p-3">
                <ImagePlus className="w-6 h-6 text-black" />
              </div>
              <p className="text-white font-medium">Drop files here to upload.</p>
            </div>
          </div>
          

          {/* Thumbnails display */}
          {uploadedFiles.length > 0 && (
            <div className="p-7 pb-0">
              <div className="flex flex-wrap gap-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative group flex flex-col items-start justify-center gap-2">
                    <div className="w-16 h-16 rounded-lg bg-gray-800 border border-gray-600 relative">
                      {file.file.type.startsWith('image/') ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover rounded-lg overflow-hidden"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-xs text-gray-400 text-center">
                            <p>{file.file.type.includes('pdf') ? 'PDF' : 
                             file.file.type.includes('doc') ? 'DOC' : 'FILE'}</p>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-400 truncate max-w-[100px]">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4 h-px bg-[#404040] border-none" />
            </div>
          )}

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
                onClick={handleAttachClick}
              >
                <ImagePlus className="w-3.5 h-3.5" />
                Attach
              </Button>
            </div>
          </div>

          <div className="surface-hc-bg flex items-end justify-between mt-6 p-4">
            <div className="flex flex-wrap gap-2 py-[3px]">
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

        <motion.div className="flex items-center justify-center gap-4 bg-[#131313] mx-auto self-center rounded-full px-6 py-3">
          <p className="secondary-text text-sm text-left">
            Not sure which models to pick?
          </p>
          <Button 
            variant="link" 
            size="link"
            onClick={() => setIsUseCaseModalOpen(true)}
          >
            Help me choose <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <UseCaseModal
          isOpen={isUseCaseModalOpen}
          onClose={() => setIsUseCaseModalOpen(false)}
          onUseCaseSelect={handleUseCaseSelect}
        />
      </div>
    </section>
  );
}