import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Workflow,
  WorkflowStep,
  WorkflowTrigger,
  TaskType,
  HumanTask,
  AutomatedTask,
} from '@/types/workflow';

import { PlusCircle, XCircle, Settings2, ChevronDown, Edit2, Zap, Users, GitBranch, Repeat } from 'lucide-react';
import AutomatedTaskSelector from './automated-task-selector';
import { RuleBuilderList } from './rule-builder';
import HumanTaskSelector from './human-task-selector';
import ActionTypeSelector from './action-type-selector';
import TriggerSelector from './trigger-selector';

interface WorkflowBuilderProps {
  initialWorkflow?: Partial<Workflow>;
  onSave: (workflow: Workflow) => void;
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ initialWorkflow, onSave }) => {
  const [workflow, setWorkflow] = useState<Partial<Workflow>>({
    id: crypto.randomUUID(),
    name: '',
    description: '',
    steps: [],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...initialWorkflow
  });

  const [editingStep, setEditingStep] = useState<Partial<WorkflowStep> | null>(null);
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType | null>(null);
  const [showStepDialog, setShowStepDialog] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | null>(null);

  const handleTriggerSelect = (trigger: WorkflowTrigger) => {
    setWorkflow(prev => ({ ...prev, trigger }));
  };

  const handleAddStep = (index?: number) => {
    setEditingStep({
      id: crypto.randomUUID(),
      rules: []
    });
    setSelectedTaskType(null);
    setInsertIndex(typeof index === 'number' ? index : null);
    setShowStepDialog(true);
  };

  const handleEditStep = (step: WorkflowStep) => {
    setEditingStep(step);
    setSelectedTaskType(step.task.type);
    setInsertIndex(null);
    setShowStepDialog(true);
  };

  const handleTaskTypeSelect = (type: TaskType) => {
    setSelectedTaskType(type);
    if (editingStep) {
      if (type === 'human') {
        const humanTask: HumanTask = {
          id: crypto.randomUUID(),
          type: 'human',
          name: editingStep.task?.name || '',
          status: 'pending',
          taskType: 'approve_document'
        };
        setEditingStep(prev => ({
          ...prev,
          task: humanTask
        }));
      } else {
        const automatedTask: AutomatedTask = {
          id: crypto.randomUUID(),
          type: 'automated',
          name: editingStep.task?.name || '',
          status: 'pending',
          taskType: 'update_status',
          config: {}
        };
        setEditingStep(prev => ({
          ...prev,
          task: automatedTask
        }));
      }
    }
  };

  const handleStepSave = () => {
    if (editingStep?.task) {
      setWorkflow(prev => {
        const steps = [...(prev.steps || [])];
        const existingIndex = steps.findIndex(s => s.id === editingStep.id);
        
        if (existingIndex >= 0) {
          // Editing existing step
          steps[existingIndex] = editingStep as WorkflowStep;
        } else if (insertIndex !== null) {
          // Inserting at specific position
          steps.splice(insertIndex + 1, 0, editingStep as WorkflowStep);
        } else {
          // Adding to end
          steps.push(editingStep as WorkflowStep);
        }
        
        return {
          ...prev,
          steps
        };
      });
      setEditingStep(null);
      setSelectedTaskType(null);
      setShowStepDialog(false);
      setInsertIndex(null);
    }
  };

  const handleStepDelete = (stepId: string) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps?.filter(step => step.id !== stepId)
    }));
  };

  const renderStep = (step: WorkflowStep, index: number) => {
    const StepIcon = step.task.type === 'human' ? Users : Settings2;
    const hasCondition = step.rules?.some(r => r.type === 'condition');
    const hasLoop = step.rules?.some(r => r.type === 'loop');
    
    return (
      <div key={step.id} className="relative flex flex-col items-center">
        {/* Add Step Button (Before) */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 px-2 py-1"
          onClick={() => handleAddStep(index - 1)}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>

        <Card className="w-64 hover:border-primary/50 transition-all">
          {/* Condition/Loop Badges */}
          <div className="absolute -top-2 left-0 flex gap-1">
            {hasCondition && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                <GitBranch className="h-3 w-3 mr-1" />
                If/Else
              </span>
            )}
            {hasLoop && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                <Repeat className="h-3 w-3 mr-1" />
                Loop
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute -right-2 -top-2 flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background"
              onClick={() => handleEditStep(step)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background"
              onClick={() => handleStepDelete(step.id)}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-full ${
                step.task.type === 'human' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                <StepIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">{step.task.name || `Step ${index + 1}`}</p>
                <p className="text-sm text-muted-foreground">
                  {step.task.type === 'human' ? 
                    (step.task as HumanTask).taskType :
                    (step.task as AutomatedTask).taskType
                  }
                </p>
              </div>
            </div>

            {/* Rules Summary */}
            {step.rules && step.rules.length > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                {step.rules.map((rule, idx) => (
                  <div key={rule.id} className="mt-1">
                    {rule.type === 'condition' && (
                      <span>
                        If {rule.settings.field} {rule.settings.operator} {rule.settings.value}
                      </span>
                    )}
                    {rule.type === 'loop' && (
                      <span>
                        {rule.settings.loopType === 'for_each' ? 'For each' : 'While'} {rule.settings.loopCondition}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Connector */}
        {index < (workflow.steps?.length || 0) - 1 && (
          <div className="my-4">
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </div>
        )}

        {/* Add Step Button (After) */}
        {index === (workflow.steps?.length || 0) - 1 && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-8 px-2 py-1"
            onClick={() => handleAddStep(index)}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-4">
        
        {/* Basic Info */}
        <Card className="p-4 space-y-4">
          <Input
            placeholder="Workflow Name"
            value={workflow.name}
            onChange={(e) => setWorkflow(prev => ({ ...prev, name: e.target.value }))}
            className="font-medium"
          />
          <Textarea
            placeholder="Workflow Description"
            value={workflow.description}
            onChange={(e) => setWorkflow(prev => ({ ...prev, description: e.target.value }))}
            className="resize-none"
          />
        </Card>

        {/* Trigger */}
        <Card className="p-4">
          <TriggerSelector
            onSelect={handleTriggerSelect}
            selectedTrigger={workflow.trigger}
          />
        </Card>

        {/* Flow Diagram */}
        <ScrollArea className="h-[600px] border rounded-lg">
          <div className="p-8">
            <div className="flex flex-col items-center space-y-4">
              {/* Trigger Card */}
              {workflow.trigger && (
                <>
                  <Card className="w-64 bg-amber-50 border-amber-200">
                    <div className="p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-full bg-amber-100">
                          <Zap className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">{workflow.trigger.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {workflow.trigger.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <ChevronDown className="h-6 w-6 text-muted-foreground" />
                </>
              )}

              {/* Steps */}
              {workflow.steps?.map((step, index) => renderStep(step, index))}

              {/* Initial Add Step Button */}
              {(!workflow.steps || workflow.steps.length === 0) && (
                <Button
                  variant="outline"
                  className="w-64 py-8"
                  onClick={() => handleAddStep()}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Step Editor Dialog */}
        <Dialog open={showStepDialog} onOpenChange={setShowStepDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingStep?.id && insertIndex === null ? 'Edit Step' : 'Add Step'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <Input
                placeholder="Step Name"
                value={editingStep?.task?.name || ''}
                onChange={(e) => setEditingStep(prev => ({
                  ...prev,
                  task: {
                    ...prev?.task!,
                    name: e.target.value
                  }
                }))}
                className="text-lg font-medium"
              />

              <ActionTypeSelector
                onSelect={handleTaskTypeSelect}
                selected={selectedTaskType || undefined}
              />

              {selectedTaskType === 'human' && editingStep?.task && (
                <HumanTaskSelector
                  value={(editingStep.task as HumanTask).taskType}
                  onChange={(taskType) => {
                    const task = editingStep.task as HumanTask;
                    setEditingStep(prev => ({
                      ...prev,
                      task: {
                        ...task,
                        taskType
                      }
                    }));
                  }}
                />
              )}

              {selectedTaskType === 'automated' && editingStep?.task && (
                <AutomatedTaskSelector
                  value={(editingStep.task as AutomatedTask).taskType}
                  onChange={(taskType) => {
                    const task = editingStep.task as AutomatedTask;
                    setEditingStep(prev => ({
                      ...prev,
                      task: {
                        ...task,
                        taskType
                      }
                    }));
                  }}
                />
              )}

              {editingStep?.task && (
                <RuleBuilderList
                  rules={editingStep.rules || []}
                  onChange={(rules) => 
                    setEditingStep(prev => ({ ...prev, rules }))
                  }
                />
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStepDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleStepSave}>
                {editingStep?.id && insertIndex === null ? 'Save Changes' : 'Add Step'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Save Workflow
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => setWorkflow(initialWorkflow || {})}
          >
            Reset
          </Button>
          <Button
            onClick={() => onSave(workflow as Workflow)}
            disabled={!workflow.name || !workflow.trigger || !workflow.steps?.length}
          >
            Save Workflow
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default WorkflowBuilder;
