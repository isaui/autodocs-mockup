"use client"

import React, { useState } from 'react';
import {
  ChevronLeft, Download, Share2, Edit, FolderOpen, Trash2, Search,
  Filter, FileText, MoreVertical, Check, Clock, Calendar, Users,
  ChevronRight,
  MessageCircle,
  Tag,
  Shield,
  History,
  Eye,
  FileUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DocumentPreview from './single-document-preview';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CommentsPanel } from './comments-panel';
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';


// Mock data for the batch
const batchData = {
  id: 'batch-1',
  name: "January New Hire Contracts",
  type: "Employment Contracts",
  status: "In Progress",
  created: "Jan 15, 2024",
  modified: "2 hours ago",
  createdBy: "John Doe",
  totalDocuments: 32,
  progress: {
    completed: 12,
    inProgress: 15,
    pending: 5
  }
};

// Mock data for documents in batch
const batchDocuments = [
    {
        id: 'doc-1',
        name: "Sarah Chen - Employment Contract",
        type: "Contract",
        status: "Completed",
        assignee: "John Doe",
        modified: "1 hour ago",
        tags: ["Employment", "New Hire", "2024"],
        comments: 3,
        version: "1.2"
      },
  {
    id: 'doc-2',
    name: "Michael Wong - Employment Contract",
    type: "Contract",
    status: "Pending",
    assignee: "Jane Smith",
    modified: "2 hours ago",
    tags: ["Employment", "New Hire", "2024"],
    comments: 3,
    version: "1.2"
  },
  {
    id: 'doc-3',
    name: "Emily Brown - Employment Contract",
    type: "Contract",
    status: "Pending",
    assignee: "John Doe",
    modified: "3 hours ago",
    tags: ["Employment", "New Hire", "2024"],
    comments: 3,
    version: "1.2"
  }
];

const activityData = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
        initials: "JD"
      },
      action: "modified the document",
      details: "Updated salary information",
      timestamp: "2 hours ago"
    },
    // ... other activities
  ];

const BatchDetail = () => {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedDocs(batchDocuments.map(doc => doc.id));
    } else {
      setSelectedDocs([]);
    }
  };

  const handleSelectDoc = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedDocs([...selectedDocs, id]);
    } else {
      setSelectedDocs(selectedDocs.filter(docId => docId !== id));
      if (selectAll) {
        setSelectAll(false);
      }
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700';
      default:
        return '';
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="p-4 max-w-[1600px] mx-auto">
          {/* Back & Actions */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Documents
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download All
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" className="gap-2">
                <FolderOpen className="h-4 w-4" />
                Move
              </Button>
              <Button variant="outline" className="gap-2 text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
  
          {/* Batch Info */}
          <div>
            <h1 className="text-2xl font-bold">{batchData.name}</h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span>{batchData.type}</span>
              <span>•</span>
              <Badge variant="outline" className={getStatusStyle(batchData.status)}>
                {batchData.status}
              </Badge>
              <span>•</span>
              <span>{batchData.totalDocuments} documents</span>
            </div>
          </div>
        </div>
      </div>
  
      {/* Split View Container */}
      <div className="flex h-[calc(100vh-136px)]">
        {/* Left Side - Batch Overview & List */}
        <div className="w-1/2 border-r flex flex-col overflow-hidden">
          <div className="p-4 flex-1 overflow-auto">
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <Progress value={75} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">75%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
  
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-500">Last Modified</div>
                        <div className="font-medium">{batchData.modified}</div>
                      </div>
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
  
              {/* Documents List */}
              {/* Documents List */}
                <Card>
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                    <CardTitle>Documents</CardTitle>
                    <div className="flex gap-2">
                        <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input 
                            className="pl-10 w-[250px]"
                            placeholder="Search documents..."
                        />
                        </div>
                        <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                        </Button>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                            <Checkbox 
                                checked={selectAll}
                                onCheckedChange={handleSelectAll}
                            />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>Info</TableHead>
                            <TableHead className="w-12">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {batchDocuments.map((doc) => (
                            <TableRow key={doc.id}>
                            <TableCell>
                                <Checkbox 
                                checked={selectedDocs.includes(doc.id)}
                                onCheckedChange={(checked) => handleSelectDoc(doc.id, checked as boolean)}
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span className="truncate">{doc.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={getStatusStyle(doc.status)}>
                                {doc.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{doc.assignee}</TableCell>
                            <TableCell>
                                <div className="flex min-w-48 flex-wrap gap-1">
                                {doc.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                    </Badge>
                                ))}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    {doc.comments}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    v{doc.version}
                                </Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" /> View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Tag className="mr-2 h-4 w-4" /> Manage Tags
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <History className="mr-2 h-4 w-4" /> Version History
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Shield className="mr-2 h-4 w-4" /> Permissions
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="mt-4 flex items-center justify-between px-4 py-4">
                        <div className="text-sm text-gray-500">
                        Showing 1-10 of 32 documents
                        </div>
                        <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">Rows per page</p>
                            <select className="h-8 w-16 rounded-md border border-gray-200 bg-white text-sm">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" disabled>
                            <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                            variant="outline"
                            size="sm"
                            className="min-w-[32px] bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                            >
                            1
                            </Button>
                            <Button variant="outline" size="sm" className="min-w-[32px]">
                            2
                            </Button>
                            <Button variant="outline" size="sm" className="min-w-[32px]">
                            3
                            </Button>
                            <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        </div>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </div>
          </div>
        </div>
  
        {/* Right Side - Document Preview */}
        <div className="w-1/2 h-full overflow-hidden flex flex-col">
          <div className="border-b">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="p-0 h-12">
                <TabsTrigger value="preview" className="data-[state=active]:bg-background">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="comments" className="data-[state=active]:bg-background">
                  Comments
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-background">
                  History
                </TabsTrigger>
              </TabsList>
              <div className="flex-1 overflow-hidden">
                <TabsContent value="preview" className="m-0 h-full">
                  <DocumentPreview type="contract" />
                </TabsContent>
                
                <TabsContent value="comments" className="m-0 h-full">
                  <ScrollArea className="h-full">
                    <div className="p-4">
                      <CommentsPanel />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="history" className="m-0 h-full">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      {activityData.map((activity) => (
                        <div key={activity.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={activity.user.avatar} />
                            <AvatarFallback>{activity.user.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm">
                              <span className="font-medium">{activity.user.name}</span>
                              {" "}
                              {activity.action}
                            </div>
                            {activity.details && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                {activity.details}
                              </div>
                            )}
                            <div className="text-xs text-gray-400 mt-1">
                              {activity.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
  
      {/* Bulk Actions Bar */}
      {selectedDocs.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-6 py-3 flex gap-4 items-center border">
          <span className="text-sm text-gray-600">{selectedDocs.length} documents selected</span>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" size="sm">
              <Check className="mr-2 h-4 w-4" /> Set Status
            </Button>
            <Button variant="ghost" size="sm">
              <FolderOpen className="mr-2 h-4 w-4" /> Move
            </Button>
            <Button variant="ghost" size="sm">
            <Tag className="mr-2 h-4 w-4" /> Tags
            </Button>
            <Button variant="ghost" size="sm">
            <FileUp className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" size="sm">
            <Shield className="mr-2 h-4 w-4" /> Permission
            </Button>
            <Button variant="ghost" size="sm">
            <History className="mr-2 h-4 w-4" /> Version
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchDetail;