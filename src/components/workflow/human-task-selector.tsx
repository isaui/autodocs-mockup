import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HelpCircle } from 'lucide-react';
import type { HumanTaskType } from '@/types/workflow';

interface HumanTaskSelectorProps {
  value: HumanTaskType;
  onChange: (value: HumanTaskType) => void;
  disabled?: boolean;
}

const taskGroups = {
  'Document Actions': [
    { value: 'approve_document', label: 'Approve Document' },
    { value: 'review_document', label: 'Review Document' },
    { value: 'sign_document', label: 'Sign Document' },
    { value: 'verify_document', label: 'Verify Document' },
  ],
  'Data Handling': [
    { value: 'input_data', label: 'Input Data' },
    { value: 'validate_data', label: 'Validate Data' },
  ],
  'Quality Control': [
    { value: 'quality_check', label: 'Quality Check' },
    { value: 'resolve_issue', label: 'Resolve Issue' },
  ],
  'Approval Process': [
    { value: 'final_approval', label: 'Final Approval' },
    { value: 'acknowledge', label: 'Acknowledge' },
  ],
  'Meeting & Scheduling': [
    { value: 'schedule_meeting', label: 'Schedule Meeting' },
  ],
  'Other': [
    { value: 'custom_task', label: 'Custom Task' },
  ]
} as const;

const HumanTaskSelector: React.FC<HumanTaskSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Task Type
        </label>
        <HelpCircle className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <Select
        value={value}
        onValueChange={(newValue) => onChange(newValue as HumanTaskType)}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a task type" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(taskGroups).map(([groupName, tasks]) => (
            <SelectGroup key={groupName}>
              <SelectLabel className="px-2 py-1.5 text-sm font-semibold">
                {groupName}
              </SelectLabel>
              {tasks.map((task) => (
                <SelectItem
                  key={task.value}
                  value={task.value}
                  className="pl-4"
                >
                  {task.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
      
      {value === 'custom_task' && (
        <p className="text-sm text-muted-foreground">
          Custom tasks allow you to define specialized human tasks specific to your workflow
        </p>
      )}
    </div>
  );
};

export default HumanTaskSelector;