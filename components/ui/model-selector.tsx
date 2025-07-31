'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Model, getAllModels } from '@/lib/models';

// Helper function to group models by provider
function groupModelsByProvider(models: Model[]) {
  return models.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, Model[]>);
}

interface ModelSelectorProps {
  models: Model[];
  selectedModels: Model[];
  onModelToggle: (modelId: string) => void;
  trigger?: React.ReactNode;
  allSelectedModels?: Model[]; // All models selected across all slots
  currentSlotModelId?: string; // The model ID for the current slot
  clearSlot?: () => void; // Function to clear the current slot
}

export function ModelSelector({ 
  models, 
  selectedModels, 
  onModelToggle, 
  trigger,
  allSelectedModels = [],
  currentSlotModelId,
  clearSlot
}: ModelSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const groupedModels = groupModelsByProvider(models);
  const selectedModelIds = selectedModels.map(m => m.id);
  const currentSelectedModelId = selectedModelIds[0]; // For single model selection

  // Filter out models that are selected in other slots, except for the current slot's model
  const filteredGroups = Object.entries(groupedModels).reduce((acc, [provider, providerModels]) => {
    const filteredModels = providerModels.filter(model => {
      // First apply search filter
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Then apply selection filter - exclude models selected in other slots
      const isSelectedInOtherSlot = allSelectedModels.some(selectedModel => 
        selectedModel.id === model.id && 
        (!currentSlotModelId || selectedModel.id !== currentSlotModelId)
      );
      
      return !isSelectedInOtherSlot;
    });
    
    if (filteredModels.length > 0) {
      acc[provider] = filteredModels;
    }
    
    return acc;
  }, {} as Record<string, Model[]>);

  const handleRemoveSelected = (modelId: string) => {
    onModelToggle(modelId);
  };

  const selectedModelsDisplay = selectedModels.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button className="button-primary text-white">
            Select Models
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="surface-bg border w-96 max-h-96 overflow-y-auto p-4 flex flex-col gap-5 rounded-[16px]"
        align="start"
      >
        <div>
          <div className="relative surface-hc-bg rounded-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search for a model"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-none focus-visible:ring-0 placeholder:text-slate-400"
            />
          </div>
        </div>

        {Object.entries(filteredGroups).map(([provider, providerModels]) => (
            <div key={provider}>
              <h3 className="font-semibold text-white text-sm mb-2">
                {provider}
              </h3>
              <div className="flex flex-row flex-wrap gap-2">
                {providerModels.map((model) => {
                  const isSelected = currentSelectedModelId === model.id;
                  return (
                    <div key={model.id} className="relative group">
                      <button
                        onClick={() => {
                          onModelToggle(model.id);
                          setTimeout(() => {
                            setIsOpen(false);
                          }, 100);
                        }}
                        className={cn(
                          "button-primary border py-1.5 text-left text-sm transition-colors",
                          isSelected
                            ? "bg-white text-black pr-7"
                            : "text-white hover:bg-action-bg"
                        )}
                      >
                        {model.name}
                      </button>
                      {isSelected && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearSlot?.();
                            // setIsOpen(false);
                          }}
                          className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-sm transition-colors"
                        >
                          <X className="w-3 h-3 text-gray-600" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 