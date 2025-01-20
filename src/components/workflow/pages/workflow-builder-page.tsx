"use client"

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Save, Undo } from 'lucide-react';

// Import our workflow components

import { Workflow } from '@/types/workflow';
import WorkflowTemplates from '../templates';
import TriggerSelector from '../trigger-selector';
import WorkflowBuilder from '../workflow-builder';
import WorkflowViewer from '../workflow-viewer';

const WorkflowBuilderPage = () => {
  const [activeTab, setActiveTab] = useState<string>('blank');
  const [workflow, setWorkflow] = useState<Partial<Workflow>>({
    id: crypto.randomUUID(),
    name: '',
    description: '',
    steps: [],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleTemplateSelect = (template: Workflow) => {
    setWorkflow(template);
    setActiveTab('editor');
  };

  const handleWorkflowUpdate = (updatedWorkflow: Partial<Workflow>) => {
    setWorkflow(prev => ({
      ...prev,
      ...updatedWorkflow
    }));
  };

  const handleSave = async (scope: 'global' | 'workspace') => {
    // TODO: Implement save logic
    console.log('Saving workflow with scope:', scope);
    console.log('Workflow data:', workflow);
    setShowSaveDialog(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create Workflow</h1>
          <p className="text-muted-foreground">
            Build a new workflow from scratch or start from a template
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => window.history.back()}>
            <Undo className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogTrigger asChild>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Workflow
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Workflow</DialogTitle>
                <DialogDescription>
                  Choose where you want to save this workflow. Global workflows can be used across all workspaces.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Button
                  variant="outline"
                  className="h-32 flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleSave('global')}
                >
                  <span className="font-semibold">Global Workflow</span>
                  <span className="text-sm text-muted-foreground text-center">
                    Available to all workspaces
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-32 flex flex-col items-center justify-center space-y-2"
                  onClick={() => handleSave('workspace')}
                >
                  <span className="font-semibold">Workspace Workflow</span>
                  <span className="text-sm text-muted-foreground text-center">
                    Only available in current workspace
                  </span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="blank">Start Blank</TabsTrigger>
          <TabsTrigger value="template">Use Template</TabsTrigger>
          <TabsTrigger value="editor" disabled={!workflow.trigger}>
            Workflow Editor
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!workflow.steps?.length}>
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blank" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the basic details for your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Workflow Name"
                  value={workflow.name}
                  onChange={(e) => handleWorkflowUpdate({ name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Workflow Description"
                  value={workflow.description}
                  onChange={(e) => handleWorkflowUpdate({ description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <TriggerSelector
                  onSelect={(trigger) => {
                    handleWorkflowUpdate({ trigger });
                    setActiveTab('editor');
                  }}
                  selectedTrigger={workflow.trigger}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="template">
          <WorkflowTemplates onSelect={handleTemplateSelect} />
        </TabsContent>

        <TabsContent value="editor">
          {workflow.trigger && (
            <WorkflowBuilder
              initialWorkflow={workflow}
              onSave={handleWorkflowUpdate}
            />
          )}
        </TabsContent>

        <TabsContent value="preview">
          {(workflow.steps?.length ?? 0) > 0 && (
            <WorkflowViewer workflow={workflow as Workflow} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowBuilderPage;