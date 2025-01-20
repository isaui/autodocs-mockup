import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Play,
  Pause,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  StepForward,
} from 'lucide-react';
import type {
  Workflow,
  WorkflowStep,
  HumanTask,
  AutomatedTask,
  TaskStatus
} from '@/types/workflow';

interface TestLog {
  timestamp: Date;
  stepId: string;
  status: TaskStatus;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

interface WorkflowTesterProps {
  workflow: Workflow;
}

const WorkflowTester: React.FC<WorkflowTesterProps> = ({ workflow }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<TestLog[]>([]);
  const [stepStatuses, setStepStatuses] = useState<Record<string, TaskStatus>>({});
  const [testData, setTestData] = useState<string>('{\n  "userId": "test-user-1",\n  "data": {\n    "key": "value"\n  }\n}');

  const addLog = (log: Omit<TestLog, 'timestamp'>) => {
    setLogs(prev => [...prev, { ...log, timestamp: new Date() }]);
  };

  const updateStepStatus = (stepId: string, status: TaskStatus) => {
    setStepStatuses(prev => ({ ...prev, [stepId]: status }));
  };

  const resetTest = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setLogs([]);
    setStepStatuses({});
  };

  const executeStep = async (step: WorkflowStep) => {
    updateStepStatus(step.id, 'in_progress');
    addLog({
      stepId: step.id,
      status: 'in_progress',
      message: `Executing step: ${step.task.name}`,
      type: 'info'
    });

    // Simulate step execution
    try {
      if (step.task.type === 'human') {
        await simulateHumanTask(step.task);
      } else {
        await simulateAutomatedTask(step.task);
      }
      
      updateStepStatus(step.id, 'completed');
      addLog({
        stepId: step.id,
        status: 'completed',
        message: `Successfully completed: ${step.task.name}`,
        type: 'success'
      });
    } catch (error:any) {
      updateStepStatus(step.id, 'failed');
      addLog({
        stepId: step.id,
        status: 'failed',
        message: `Failed: ${error.message}`,
        type: 'error'
      });
      setIsRunning(false);
    }
  };

  const simulateHumanTask = (task: HumanTask): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate human task completion time
      setTimeout(resolve, 2000);
    });
  };

  const simulateAutomatedTask = (task: AutomatedTask): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate automated task execution
      setTimeout(() => {
        if (Math.random() > 0.9) { // 10% chance of failure
          reject(new Error('Task execution failed'));
        }
        resolve();
      }, 1000);
    });
  };

  const startTest = () => {
    try {
      JSON.parse(testData); // Validate JSON
      setIsRunning(true);
      setCurrentStepIndex(0);
      addLog({
        stepId: 'workflow',
        status: 'in_progress',
        message: 'Starting workflow test',
        type: 'info'
      });
    } catch (error) {
      addLog({
        stepId: 'workflow',
        status: 'failed',
        message: 'Invalid test data JSON',
        type: 'error'
      });
    }
  };

  const stepForward = () => {
    if (currentStepIndex < workflow.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsRunning(false);
      addLog({
        stepId: 'workflow',
        status: 'completed',
        message: 'Workflow test completed',
        type: 'success'
      });
    }
  };

  React.useEffect(() => {
    if (isRunning && currentStepIndex >= 0) {
      const currentStep = workflow.steps[currentStepIndex];
      executeStep(currentStep);
    }
  }, [isRunning, currentStepIndex]);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLogIcon = (type: TestLog['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Workflow Test</CardTitle>
          <CardDescription>Test and simulate workflow execution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Test Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant={isRunning ? "secondary" : "default"}
                onClick={isRunning ? () => setIsRunning(false) : startTest}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={resetTest}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                variant="outline"
                onClick={stepForward}
                disabled={!isRunning}
              >
                <StepForward className="h-4 w-4 mr-2" />
                Step Forward
              </Button>
            </div>

            {/* Test Data */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Test Data</h3>
              <Textarea
                value={testData}
                onChange={(e) => setTestData(e.target.value)}
                className="font-mono text-sm"
                rows={5}
                disabled={isRunning}
              />
            </div>

            {/* Steps Progress */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Steps Progress</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Step</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflow.steps.map((step) => (
                    <TableRow key={step.id}>
                      <TableCell>{step.task.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {step.task.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(stepStatuses[step.id] || 'pending')}
                          <span className="capitalize">
                            {stepStatuses[step.id] || 'pending'}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Execution Logs */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Execution Logs</h3>
              <Card>
                <ScrollArea className="h-[200px] w-full rounded-md border">
                  <div className="p-4 space-y-2">
                    {logs.map((log, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <div className="mt-0.5">
                          {getLogIcon(log.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {log.timestamp.toLocaleTimeString()}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {log.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {log.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowTester;