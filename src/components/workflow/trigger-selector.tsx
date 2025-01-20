import { TriggerType, WorkflowTrigger } from "@/types/workflow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TriggerSelectorProps {
  onSelect: (trigger: WorkflowTrigger) => void;
  selectedTrigger?: WorkflowTrigger;
}

const triggerOptions: Array<{ type: TriggerType; label: string; description: string }> = [
  {
    type: "document_created",
    label: "Document Created",
    description: "Trigger when a new document is created",
  },
  {
    type: "document_updated",
    label: "Document Updated",
    description: "Trigger when a document is modified",
  },
  {
    type: "status_changed",
    label: "Status Changed",
    description: "Trigger when a document status changes",
  },
  {
    type: "comment_added",
    label: "Comment Added",
    description: "Trigger when a comment is added to a document",
  },
  {
    type: "approval_completed",
    label: "Approval Completed",
    description: "Trigger when a document approval process is completed",
  },
  {
    type: "scheduled",
    label: "Scheduled",
    description: "Trigger at a specific scheduled time",
  },
  {
    type: "manual_trigger",
    label: "Manual Trigger",
    description: "Trigger manually by a user action",
  },
  {
    type: "document_shared",
    label: "Document Shared",
    description: "Trigger when a document is shared",
  },
  {
    type: "tag_added",
    label: "Tag Added",
    description: "Trigger when a tag is added to a document",
  },
  {
    type: "version_created",
    label: "Version Created",
    description: "Trigger when a new version of a document is created",
  },
];

const TriggerSelector: React.FC<TriggerSelectorProps> = ({ onSelect, selectedTrigger }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Select Trigger</h3>
        <p className="text-sm text-gray-500">Choose when this workflow should start</p>
      </div>

      <Select
        onValueChange={(value) => {
          const selected = triggerOptions.find((trigger) => trigger.type === value);
          if (selected) {
            onSelect({
              id: crypto.randomUUID(),
              type: selected.type,
              name: selected.label,
              description: selected.description,
            });
          }
        }}
        value={selectedTrigger?.type || ""}
      >
        <SelectTrigger className="w-auto min-w-[200px]">
          <SelectValue placeholder="Select a trigger">
            {selectedTrigger ? selectedTrigger.name : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {triggerOptions.map((trigger) => (
            <SelectItem key={trigger.type} value={trigger.type}>
              <div className="flex flex-col">
                <span className="font-medium">{trigger.label}</span>
                <span className="text-sm text-muted-foreground">{trigger.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TriggerSelector;

