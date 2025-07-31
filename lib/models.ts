export interface Model {
  id: string;
  name: string;
  provider: string;
  inputPrice: string;
  outputPrice: string;
  contextWindow: string;
  description: string;
  pro?: boolean;
}

export const modelData: Model[] = [
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

export const providerColors = {
  'Anthropic': 'from-orange-500 to-red-500',
  'OpenAI': 'from-green-500 to-teal-500',
  'Meta': 'from-blue-500 to-purple-500',
  'Google': 'from-blue-500 to-indigo-500',
  'Mistral AI': 'from-purple-500 to-pink-500',
  'Cohere': 'from-emerald-500 to-cyan-500',
  'Perplexity': 'from-violet-500 to-purple-500',
  'DeepSeek': 'from-yellow-500 to-orange-500',
};

// Helper functions
export const getModelById = (modelId: string): Model | undefined => {
  return modelData.find(model => model.id === modelId);
};

export const getModelsByProvider = (provider: string): Model[] => {
  return modelData.filter(model => model.provider === provider);
};

export const getAllModels = (): Model[] => {
  return modelData;
};

// For backward compatibility with existing code that expects simplified model objects
export const getSimplifiedModels = () => {
  return modelData.map(model => ({
    id: model.id,
    name: model.name,
    provider: model.provider
  }));
}; 