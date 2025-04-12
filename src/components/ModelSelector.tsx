
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export type AIModel = {
  id: string;
  name: string;
  provider: string;
  type: 'cloud' | 'local';
};

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel: AIModel;
  onSelectModel: (model: AIModel) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModel, onSelectModel }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between w-full border-gray-700 bg-gray-800 text-terminal-text hover:bg-gray-700">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${selectedModel.type === 'cloud' ? 'bg-terminal-blue' : 'bg-terminal-green'}`}></div>
            <span>{selectedModel.name}</span>
            <span className="text-xs text-gray-400 ml-2">({selectedModel.provider})</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full bg-gray-800 border-gray-700">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className="flex justify-between cursor-pointer hover:bg-gray-700"
            onClick={() => onSelectModel(model)}
          >
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${model.type === 'cloud' ? 'bg-terminal-blue' : 'bg-terminal-green'}`}></div>
              <span className="text-terminal-text">{model.name}</span>
              <span className="text-xs text-gray-400 ml-2">({model.provider})</span>
            </div>
            {selectedModel.id === model.id && (
              <Check className="h-4 w-4 text-terminal-green" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelSelector;
