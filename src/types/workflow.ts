// types/workflow.ts

// Base Types
export type TaskType = 'human' | 'automated';
export type TaskStatus = 'pending' | 'completed' | 'failed' | 'in_progress';

// Human Tasks
export type HumanTaskType = 
  | 'approve_document'      // Approve a document
  | 'review_document'       // Review and provide feedback
  | 'sign_document'         // Sign a document
  | 'verify_document'       // Verify document contents
  | 'input_data'           // Input additional data
  | 'validate_data'        // Validate existing data
  | 'resolve_issue'        // Resolve reported issues
  | 'quality_check'        // Perform quality check
  | 'final_approval'       // Final approval step
  | 'acknowledge'         // Acknowledge receipt/changes
  | 'schedule_meeting'
  | 'custom_task';         // Custom human task

// Automated Tasks
export type AutomatedTaskType =
  // Document Related
  | 'update_status'        // Update document status
  | 'move_document'        // Move document to different folder
  | 'copy_document'        // Create document copy
  | 'convert_format'       // Convert document format
  | 'archive_document'     // Archive document
  | 'generate_document'    // Generate new document
  | 'merge_documents'      // Merge multiple documents

  | 'assign_data'
  
  // Notification Related
  | 'send_email'          // Send email notification
  | 'send_reminder'       // Send reminder
  | 'notify_slack'        // Send Slack notification
  | 'notify_google'      // Send Google reminder
  | 'notify_teams'        // Send MS Teams notification
  
  // Data Related
  | 'update_metadata'     // Update document metadata
  | 'extract_data'        // Extract data from document
  | 'validate_data'       // Validate data automatically
  | 'sync_data'           // Sync data with other systems
  
  // Integration Related
  | 'api_call'            // Make external API call
  | 'update_system'       // Update external system
  | 'trigger_webhook'     // Trigger webhook
  | 'custom_automation';  // Custom automation task

// Task Interfaces
export interface BaseTask {
  id: string;
  name: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
}

export interface HumanTask extends BaseTask {
  type: 'human';
  taskType: HumanTaskType;
  assignee?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
  instructions?: string;
}

export interface AutomatedTask extends BaseTask {
  type: 'automated';
  taskType: AutomatedTaskType;
  config: Record<string, any>; // Configuration specific to task type
  retryCount?: number;
  timeout?: number;
}

// Workflow Types
export type TriggerType =
  | 'document_created'
  | 'document_updated'
  | 'status_changed'
  | 'comment_added'
  | 'approval_completed'
  | 'scheduled'
  | 'manual_trigger'
  | 'document_shared'
  | 'tag_added'
  | 'version_created';

export interface WorkflowTrigger {
  id: string;
  type: TriggerType;
  name: string;
  description?: string;
  config?: Record<string, any>;
}

export interface WorkflowRule {
  id: string;
  type: 'condition' | 'loop';
  settings: {
    field?: string;
    operator?: string;
    value?: any;
    loopType?: 'for_each' | 'while' | 'do_while';
    loopCondition?: string;
    maxIterations?: number;
  };
}

export interface WorkflowStep {
  id: string;
  task: HumanTask | AutomatedTask;
  rules?: WorkflowRule[];
  nextSteps?: string[]; // IDs of next steps
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}