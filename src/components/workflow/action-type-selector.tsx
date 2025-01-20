// components/workflow/ActionTypeSelector.tsx
import React from 'react';
import { Users, Cpu } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TaskType } from '@/types/workflow';

interface ActionTypeSelectorProps {
  onSelect: (type: TaskType) => void;
  selected?: TaskType;
}

const actionTypes = [
  {
    type: 'human' as TaskType,
    title: 'Human Task',
    description: 'Tasks that require human interaction like approvals, reviews, or data input',
    icon: <Users className="h-6 w-6" />
  },
  {
    type: 'automated' as TaskType,
    title: 'Automated Task',
    description: 'Automated actions like sending notifications, updating status, or system integrations',
    icon: <Cpu className="h-6 w-6" />
  }
];

const ActionTypeSelector: React.FC<ActionTypeSelectorProps> = ({ onSelect, selected }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Select Action Type</h3>
        <p className="text-sm text-gray-500">Choose between human task or automated action</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actionTypes.map((action) => (
          <Card 
            key={action.type}
            className={`cursor-pointer transition-all hover:border-primary/50 ${
              selected === action.type ? 'border-primary ring-2 ring-primary/20' : ''
            }`}
            onClick={() => onSelect(action.type)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`${
                  selected === action.type 
                    ? 'text-primary' 
                    : 'text-gray-500'
                }`}>
                  {action.icon}
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {action.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActionTypeSelector;