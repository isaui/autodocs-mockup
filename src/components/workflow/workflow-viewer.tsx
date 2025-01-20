import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  Cpu,
  ArrowDown,
  ChevronRight,
  GitBranch,
  RotateCw,
  Zap,
  AlertCircle,
  TestTube,
  Play,
} from 'lucide-react';
import type {
  Workflow,
  WorkflowStep,
  HumanTask,
  AutomatedTask,
  WorkflowRule
} from '@/types/workflow';
import { Button } from '../ui/button';

interface WorkflowViewerProps {
  workflow: Workflow;
  currentStepId?: string;
  onStepClick?: (stepId: string) => void;
}

const StepIcon: React.FC<{ task: HumanTask | AutomatedTask }> = ({ task }) => {
  if (task.type === 'human') {
    return <Users className="h-5 w-5" />;
  }
  return <Cpu className="h-5 w-5" />;
};

const TaskBadge: React.FC<{ task: HumanTask | AutomatedTask }> = ({ task }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge variant="outline" className={getStatusColor(task.status)}>
      {task.type === 'human' ? task.taskType : task.taskType}
    </Badge>
  );
};

const RuleNode: React.FC<{ rule: WorkflowRule }> = ({ rule }) => {
  const getDescription = () => {
    if (rule.type === 'condition') {
      return `${rule.settings.field} ${rule.settings.operator} ${rule.settings.value}`;
    }
    return `${rule.settings.loopType} (max: ${rule.settings.maxIterations})`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center space-x-2 rounded-lg border p-2 bg-muted/50">
            {rule.type === 'condition' ? (
              <GitBranch className="h-4 w-4" />
            ) : (
              <RotateCw className="h-4 w-4" />
            )}
            <span className="text-sm">{getDescription()}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{rule.type === 'condition' ? 'Condition Rule' : 'Loop Rule'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const StepNode: React.FC<{
  step: WorkflowStep;
  isActive?: boolean;
  onClick?: () => void;
}> = ({ step, isActive, onClick }) => {
  return (
    <Card
      className={`w-full transition-all cursor-pointer hover:border-primary/50 ${
        isActive ? 'border-primary ring-2 ring-primary/20' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${
              step.task.type === 'human' ? 'bg-blue-100' : 'bg-green-100'
            }`}>
              <StepIcon task={step.task} />
            </div>
            <div>
              <CardTitle className="text-base">
                {step.task.name || `Step ${step.task.id}`}
              </CardTitle>
              <CardDescription className="text-sm">
                {step.task.description || step.task.type}
              </CardDescription>
            </div>
          </div>
          <TaskBadge task={step.task} />
        </div>
      </CardHeader>
      {(step.rules && step.rules.length > 0) && (
        <CardContent className="p-4 pt-0">
          <div className="space-y-2">
            {step.rules.map((rule, idx) => (
              <RuleNode key={rule.id} rule={rule} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const WorkflowViewer: React.FC<WorkflowViewerProps> = ({
  workflow,
  currentStepId,
  onStepClick
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{workflow.name}</CardTitle>
            <CardDescription>
              {workflow.description || 'No description provided'}
            </CardDescription>
          </div>
          <div className=' flex items-center space-x-4'>
          <Badge variant={"default"}>
            {"Inactive"}
          </Badge>
          <Button
              // onClick={handleTestWorkflow}
              className="px-4 py-2 text-sm font-medium text-white  rounded-md"
            >
              <Play className='w-3 h-3 mr-2'/>
              Test Workflow
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-8">
            {/* Trigger */}
            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardHeader className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-amber-100">
                      <Zap className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {workflow.trigger.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {workflow.trigger.description || workflow.trigger.type}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Connector */}
            <div className="flex justify-center">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {workflow.steps.map((step, index) => (
                <div key={step.id} className="space-y-4">
                  <StepNode
                    step={step}
                    isActive={step.id === currentStepId}
                    onClick={() => onStepClick?.(step.id)}
                  />
                  
                  {/* Show connector if not last step */}
                  {index < workflow.steps.length - 1 && (
                    <div className="flex justify-center">
                      <ArrowDown className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No Steps */}
            {workflow.steps.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No steps defined in this workflow</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WorkflowViewer;