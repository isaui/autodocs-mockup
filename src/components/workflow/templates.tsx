//templates.tsx

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  FileText,
  ClipboardCheck,
  UserPlus,
  Calendar,
  Award,
  Building2,
  GraduationCap,
  Search,
  AlertCircle,
} from 'lucide-react';
import type { Workflow, WorkflowTrigger, HumanTask, AutomatedTask } from '@/types/workflow';

// Template categories for HR workflows
const categories = [
  { id: 'onboarding', name: 'Onboarding', icon: UserPlus },
  { id: 'offboarding', name: 'Offboarding', icon: Building2 },
  { id: 'recruitment', name: 'Recruitment', icon: Search },
  { id: 'performance', name: 'Performance Review', icon: Award },
  { id: 'training', name: 'Training', icon: GraduationCap },
  { id: 'leave', name: 'Leave Management', icon: Calendar },
] as const;

type Category = typeof categories[number]['id'];

// HR workflow templates
export const hrTemplates: Record<Category, Array<Workflow>> = {
    onboarding: [
        {
          id: 'onboarding-basic',
          name: 'Basic Employee Onboarding',
          description: 'Standard onboarding process for new employees',
          trigger: {
            id: 'trigger-1',
            type: 'manual_trigger',
            name: 'New Employee Hired',
            description: 'Triggered when a new employee is hired'
          },
          steps: [
            {
              id: 'step-1',
              task: {
                id: 'task-1',
                type: 'automated',
                name: 'Create Email Account',
                status: 'pending',
                taskType: 'api_call',
                config: {
                  service: 'gsuite',
                  action: 'create_account'
                }
              },
              rules: []
            },
            {
              id: 'step-2',
              task: {
                id: 'task-2',
                type: 'human',
                name: 'Review & Sign Documents',
                status: 'pending',
                taskType: 'sign_document',
                assignee: 'new_employee'
              },
              rules: []
            },
            {
              id: 'step-3',
              task: {
                id: 'task-3',
                type: 'automated',
                name: 'Send Welcome Email',
                status: 'pending',
                taskType: 'send_email',
                config: {
                  template: 'welcome_email'
                }
              },
              rules: []
            },
            {
              id: 'step-4',
              task: {
                id: 'task-4',
                type: 'human',
                name: 'Provide Workspace Setup Instructions',
                status: 'pending',
                taskType: 'input_data',
                assignee: 'it_department',
                instructions: 'Ensure new employee has a desk, laptop, and other necessary items.'
              },
              rules: []
            },
            {
              id: 'step-5',
              task: {
                id: 'task-5',
                type: 'human',
                name: 'Schedule Introductory Meetings',
                status: 'pending',
                taskType: 'schedule_meeting',
                assignee: 'hr_manager',
                instructions: 'Schedule 1:1s with the team and manager for the new hire.'
              },
              rules: []
            },
            {
              id: 'step-6',
              task: {
                id: 'task-6',
                type: 'automated',
                name: 'Assign Mandatory Training Modules',
                status: 'pending',
                taskType: 'assign_data',
                config: {
                  trainingModules: ['HR Policies', 'Workplace Safety']
                }
              },
              rules: []
            },
            {
              id: 'step-7',
              task: {
                id: 'task-7',
                type: 'human',
                name: 'Feedback Check-In',
                status: 'pending',
                taskType: 'validate_data',
                assignee: 'hr_manager',
                instructions: 'Ensure the new hire is settling in and address any concerns.'
              },
              rules: []
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
          active: true
        }
      ],
  offboarding: [
    {
      id: 'offboarding-basic',
      name: 'Standard Offboarding Process',
      description: 'Complete offboarding workflow for departing employees',
      trigger: {
        id: 'trigger-1',
        type: 'manual_trigger',
        name: 'Employee Departure Notice',
        description: 'Triggered when employee resignation is received'
      },
      steps: [
        {
          id: 'step-1',
          task: {
            id: 'task-1',
            type: 'human',
            name: 'Exit Interview',
            status: 'pending',
            taskType: 'input_data',
            assignee: 'hr_manager'
          },
          rules: []
        },
        {
          id: 'step-2',
          task: {
            id: 'task-2',
            type: 'automated',
            name: 'Revoke System Access',
            status: 'pending',
            taskType: 'api_call',
            config: {
              action: 'revoke_access'
            }
          },
          rules: []
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true
    }
  ],
  recruitment: [
    {
      id: 'recruitment-full',
      name: 'Full Recruitment Pipeline',
      description: 'End-to-end recruitment process from job posting to offer letter',
      trigger: {
        id: 'trigger-1',
        type: 'manual_trigger',
        name: 'New Position Opening',
        description: 'Triggered when new position is approved'
      },
      steps: [
        {
          id: 'step-1',
          task: {
            id: 'task-1',
            type: 'human',
            name: 'Create Job Description',
            status: 'pending',
            taskType: 'input_data',
            assignee: 'hiring_manager'
          },
          rules: []
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true
    }
  ],
  performance: [
    {
      id: 'performance-review-quarterly',
      name: 'Quarterly Performance Review',
      description: 'Standard quarterly performance evaluation process',
      trigger: {
        id: 'trigger-1',
        type: 'scheduled',
        name: 'Quarterly Review',
        description: 'Triggered at the start of each quarter'
      },
      steps: [
        {
          id: 'step-1',
          task: {
            id: 'task-1',
            type: 'human',
            name: 'Self Assessment',
            status: 'pending',
            taskType: 'input_data',
            assignee: 'employee'
          },
          rules: []
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true
    }
  ],
  training: [
    {
      id: 'training-onboarding',
      name: 'New Employee Training',
      description: 'Training workflow for new employees',
      trigger: {
        id: 'trigger-1',
        type: 'manual_trigger',
        name: 'Start Training',
        description: 'Triggered when new employee starts'
      },
      steps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true
    }
  ],
  leave: [
    {
      id: 'leave-request',
      name: 'Leave Request Process',
      description: 'Standard leave request and approval workflow',
      trigger: {
        id: 'trigger-1',
        type: 'manual_trigger',
        name: 'Leave Request',
        description: 'Triggered when employee submits leave request'
      },
      steps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true
    }
  ]
};

interface WorkflowTemplatesProps {
  onSelect: (template: Workflow) => void;
}

const WorkflowTemplates: React.FC<WorkflowTemplatesProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>('onboarding');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">HR Workflow Templates</CardTitle>
        <CardDescription>
          Choose from pre-built templates for common HR processes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-4 mb-6">
          {categories.map(({ id, name, icon: Icon }) => (
            <Card
              key={id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${
                selectedCategory === id ? 'border-primary ring-2 ring-primary/20' : ''
              }`}
              onClick={() => setSelectedCategory(id)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{name}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hrTemplates[selectedCategory].map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer hover:border-primary/50"
                onClick={() => onSelect(template)}
              >
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <Badge variant="outline">
                      {template.steps.length} steps
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>{template.trigger.name}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WorkflowTemplates;