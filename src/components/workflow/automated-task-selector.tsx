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
import type { AutomatedTaskType } from '@/types/workflow';

interface AutomatedTaskSelectorProps {
  value: AutomatedTaskType;
  onChange: (value: AutomatedTaskType) => void;
  disabled?: boolean;
}

const taskGroups = {
  'Document Operations': [
    { value: 'update_status', label: 'Update Status' },
    { value: 'move_document', label: 'Move Document' },
    { value: 'copy_document', label: 'Copy Document' },
    { value: 'convert_format', label: 'Convert Format' },
    { value: 'archive_document', label: 'Archive Document' },
    { value: 'generate_document', label: 'Generate Document' },
    { value: 'merge_documents', label: 'Merge Documents' },
  ],
  'Notifications': [
    { value: 'send_email', label: 'Send Email' },
    { value: 'send_reminder', label: 'Send Reminder' },
    { value: 'notify_slack', label: 'Notify Slack' },
    { value: 'notify_google', label: 'Notify Google' },
    { value: 'notify_teams', label: 'Notify Teams' },
  ],
  'Data Management': [
    { value: 'update_metadata', label: 'Update Metadata' },
    { value: 'extract_data', label: 'Extract Data' },
    { value: 'validate_data', label: 'Validate Data' },
    { value: 'sync_data', label: 'Sync Data' },
    { value: 'assign_data', label: 'Assign Data' },
  ],
  'Integrations': [
    { value: 'api_call', label: 'API Call' },
    { value: 'update_system', label: 'Update System' },
    { value: 'trigger_webhook', label: 'Trigger Webhook' },
    { value: 'custom_automation', label: 'Custom Automation' },
  ],
} as const;

const AutomatedTaskSelector: React.FC<AutomatedTaskSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  // Function to get description based on task type
  const getTaskDescription = (taskType: AutomatedTaskType): string => {
    const descriptions: Record<AutomatedTaskType, string> = {
      assign_data: 'Assign and distribute resources to users or groups',
      update_status: 'Update the status of a document automatically',
      move_document: 'Move document to a different location',
      copy_document: 'Create a copy of the document',
      convert_format: 'Convert document to a different format',
      archive_document: 'Archive document automatically',
      generate_document: 'Generate a new document from template',
      merge_documents: 'Combine multiple documents into one',
      send_email: 'Send automated email notifications',
      send_reminder: 'Send automated reminders',
      notify_slack: 'Send notifications to Slack',
      notify_google: 'Send notifications to Google services',
      notify_teams: 'Send notifications to Microsoft Teams',
      update_metadata: 'Update document metadata automatically',
      extract_data: 'Extract data from documents',
      validate_data: 'Validate data automatically',
      sync_data: 'Synchronize data with external systems',
      api_call: 'Make external API calls',
      update_system: 'Update external system data',
      trigger_webhook: 'Trigger external webhooks',
      custom_automation: 'Create custom automated tasks'
    };
    
    return descriptions[taskType];
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Automated Task Type
        </label>
        <HelpCircle className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <Select
        value={value}
        onValueChange={(newValue) => onChange(newValue as AutomatedTaskType)}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an automated task type" />
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
      
      <p className="text-sm text-muted-foreground">
        {getTaskDescription(value)}
      </p>
    </div>
  );
};

export default AutomatedTaskSelector;