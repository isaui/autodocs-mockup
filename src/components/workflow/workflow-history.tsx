import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, RotateCcw, Eye } from 'lucide-react';
import { Workflow } from '@/types/workflow';

// Extend Workflow type to include version info
interface WorkflowVersion extends Workflow {
  version: number;
  changedBy: string;
  changeType: 'created' | 'updated' | 'deleted' | 'restored';
  timestamp: Date;
  changes?: {
    field: string;
    oldValue?: any;
    newValue?: any;
  }[];
}

interface WorkflowHistoryProps {
  versions: WorkflowVersion[];
  onRestore?: (version: WorkflowVersion) => void;
  onPreview?: (version: WorkflowVersion) => void;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getChangeTypeColor = (changeType: WorkflowVersion['changeType']) => {
  const colors = {
    created: 'bg-green-100 text-green-800',
    updated: 'bg-blue-100 text-blue-800',
    deleted: 'bg-red-100 text-red-800',
    restored: 'bg-purple-100 text-purple-800'
  };
  return colors[changeType];
};

const WorkflowHistory: React.FC<WorkflowHistoryProps> = ({
  versions,
  onRestore,
  onPreview
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Workflow History</CardTitle>
            <CardDescription>
              Track changes and versions of your workflow
            </CardDescription>
          </div>
          <Badge variant="outline" className="h-6">
            {versions.length} Versions
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <Accordion type="single" collapsible className="space-y-4">
            {versions.map((version) => (
              <AccordionItem
                key={`${version.id}-${version.version}`}
                value={`${version.id}-${version.version}`}
                className="border rounded-lg p-2"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full bg-primary/10`}>
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Version {version.version}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(version.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getChangeTypeColor(version.changeType)}>
                        {version.changeType.charAt(0).toUpperCase() + version.changeType.slice(1)}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        by {version.changedBy}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-4">
                    {/* Changes List */}
                    {version.changes && version.changes.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Changes</h4>
                        <div className="space-y-2">
                          {version.changes.map((change, index) => (
                            <div
                              key={index}
                              className="text-sm border rounded-md p-2 bg-muted/50"
                            >
                              <p className="font-medium">{change.field}</p>
                              {change.oldValue !== undefined && (
                                <p className="text-red-500 line-through">
                                  {JSON.stringify(change.oldValue)}
                                </p>
                              )}
                              {change.newValue !== undefined && (
                                <p className="text-green-500">
                                  {JSON.stringify(change.newValue)}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Workflow Details */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Name</p>
                          <p>{version.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Trigger</p>
                          <p>{version.trigger.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Steps</p>
                          <p>{version.steps.length} steps</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Status</p>
                          <Badge variant={version.active ? "success" : "secondary"}>
                            {version.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-2 pt-2">
                      {onPreview && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onPreview(version)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      )}
                      {onRestore && version.changeType !== 'restored' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onRestore(version)}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WorkflowHistory;