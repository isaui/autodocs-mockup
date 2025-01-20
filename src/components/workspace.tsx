"use client"

import React, { useState } from 'react';
import { 
  Search, Filter, FolderOpen, Download, Share2, Edit, Trash2, Tag, 
  Settings, ChevronRight, Home, FileText, MoreVertical, Eye, 
  Activity, Shield, History, Folder, 
  FileUp
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Sidebar from './sidebar';


const ICON_CLASS = "h-4 w-4";

// Mock data with tags
const batchDocuments = [
  {
    id: 'batch-1',
    name: "January New Hire Contracts",
    count: 32,
    type: "Batch",
    status: "Completed",
    date: "Jan 31, 2024",
    tags: ["2024", "New Hire", "Q1"]
  },
  {
    id: 'batch-2',
    name: "Q1 Performance Reviews",
    count: 45,
    type: "Batch",
    status: "In Progress",
    date: "2 hours ago",
    tags: ["2024", "Review", "Q1"]
  },
  {
    id: 'batch-3',
    name: "February Salary Revisions",
    count: 28,
    type: "Batch",
    status: "Pending",
    date: "4 hours ago",
    tags: ["2024", "Salary", "Q1"]
  }
];

const individualDocuments = [
  {
    id: 'doc-1',
    name: "Sarah Chen - Employment Contract",
    type: "Contract",
    status: "Pending",
    date: "1 hour ago",
    tags: ["Employment", "New Hire"]
  },
  {
    id: 'doc-2',
    name: "John Smith - Promotion Letter",
    type: "Promotion",
    status: "Completed",
    date: "2 hours ago",
    tags: ["Promotion", "HR"]
  },
  {
    id: 'doc-3',
    name: "David Lee - Warning Letter",
    type: "Warning",
    status: "In Review",
    date: "3 hours ago",
    tags: ["Warning", "HR"]
  },
  {
    id: 'doc-4',
    name: "Maria Garcia - Leave Application",
    type: "Leave",
    status: "Approved",
    date: "4 hours ago",
    tags: ["Leave", "HR"]
  }
];

const SingleItemActions = () => (
  <div className="flex gap-2">
    <Button variant="ghost" size="sm">
      <Eye className="mr-2 h-4 w-4" /> View
    </Button>
    <Button variant="ghost" size="sm">
      <Download className="mr-2 h-4 w-4" /> Download
    </Button>
    <Button variant="ghost" size="sm">
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>
    <Button variant="ghost" size="sm">
      <Activity className="mr-2 h-4 w-4" /> Status
    </Button>
    <Button variant="ghost" size="sm">
      <Edit className="mr-2 h-4 w-4" /> Edit
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
);

const BulkActions = () => (
  <div className="flex gap-2">
    <Button variant="ghost" size="sm">
      <Download className="mr-2 h-4 w-4" /> Download
    </Button>
    <Button variant="ghost" size="sm">
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>
    <Button variant="ghost" size="sm">
      <Activity className="mr-2 h-4 w-4" /> Status
    </Button>
    <Button variant="ghost" size="sm">
      <FolderOpen className="mr-2 h-4 w-4" /> Move
    </Button>
    <Button variant="ghost" size="sm">
      <Shield className="mr-2 h-4 w-4" /> Permission
    </Button>
    <Separator orientation="vertical" className="h-6" />
    <Button variant="ghost" size="sm" className="text-red-600">
      <Trash2 className="mr-2 h-4 w-4" /> Delete
    </Button>
  </div>
);

const Workspace = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      const allIds = [...batchDocuments, ...individualDocuments].map(doc => doc.id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
      if (selectAll) {
        setSelectAll(false);
      }
    }
  };

  const getStatusStyles = (status: string) => {
    const baseStyles = "bg-opacity-50 ";
    switch (status) {
      case 'Completed':
      case 'Approved':
        return baseStyles + 'bg-green-50 text-green-700';
      case 'In Progress':
        return baseStyles + 'bg-blue-50 text-blue-700';
      case 'Pending':
        return baseStyles + 'bg-yellow-50 text-yellow-700';
      case 'In Review':
        return baseStyles + 'bg-purple-50 text-purple-700';
      case 'Rejected':
        return baseStyles + 'bg-red-50 text-red-700';
      default:
        return '';
    }
  };

  const renderDropdownActions = () => (
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
        <Activity className="mr-2 h-4 w-4" /> Status
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Edit className="mr-2 h-4 w-4" /> Edit
      </DropdownMenuItem>
      <DropdownMenuItem>
        <FolderOpen className="mr-2 h-4 w-4" /> Move
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Tag className="mr-2 h-4 w-4" /> Manage Tags
      </DropdownMenuItem>
      <DropdownMenuItem>
        <FileUp className="mr-2 h-4 w-4" /> Export
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Shield className="mr-2 h-4 w-4" /> Permission
      </DropdownMenuItem>
      <DropdownMenuItem>
        <History className="mr-2 h-4 w-4" /> Version History
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600">
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  return (
    <div className="w-screen min-h-screen flex bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-auto">
        <div className="border-b">
          <div className="p-4 max-w-7xl mx-auto w-full">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Home className={ICON_CLASS} />
              <ChevronRight className={ICON_CLASS} />
              <span>Workspaces</span>
              <ChevronRight className={ICON_CLASS} />
              <span>HR Department</span>
              <ChevronRight className={ICON_CLASS} />
              <span>Documents</span>
              <ChevronRight className={ICON_CLASS} />
              <span className="font-medium text-gray-900">Employee Contracts</span>
            </div>
  
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Employee Contracts</h1>
                <p className="text-sm text-gray-600">HR Department • 245 documents</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input 
                    className="min-w-[300px] pl-10"
                    placeholder="Search in Employee Contracts..."
                  />
                </div>
              </div>
            </div>
  
            {/* Status Filters */}
            <div className="flex gap-2 mt-4">
              <Button variant="secondary" className='border border-gray-200'>
                All Documents
              </Button>
              <Badge variant="outline" className="bg-green-50 hover:bg-green-100 text-green-700">
                Completed (45)
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700">
                Pending (12)
              </Badge>
              <Badge variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700">
                In Progress (28)
              </Badge>
              <Badge variant="outline" className="bg-purple-50 hover:bg-purple-100 text-purple-700">
                In Review (15)
              </Badge>
              <Badge variant="outline" className="bg-red-50 hover:bg-red-100 text-red-700">
                Rejected (3)
              </Badge>
            </div>
          </div>
        </div>
  
        {/* Main Content Scrollable */}
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Quick Access Folders */}
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  name: "January New Hire Contracts",
                  count: 32,
                  icon: <FolderOpen className={ICON_CLASS + " text-blue-500"} />
                },
                {
                  name: "Q1 Performance Reviews",
                  count: 45,
                  icon: <FolderOpen className={ICON_CLASS + " text-blue-500"} />
                },
                {
                  name: "Annual Leave Forms",
                  count: 50,
                  icon: <FolderOpen className={ICON_CLASS + " text-blue-500"} />
                },
                {
                  name: "Promotions",
                  count: 15,
                  icon: <FolderOpen className={ICON_CLASS + " text-blue-500"} />
                }
              ].map((folder) => (
                <Card className="hover:bg-gray-50 cursor-pointer" key={folder.name}>
                  <CardContent className="p-4">
                    {folder.icon}
                    <div className="font-medium mt-2">{folder.name}</div>
                    <div className="text-sm text-gray-600">{folder.count} documents</div>
                  </CardContent>
                </Card>
              ))}
            </div>
  
            {/* Document List */}
            <Card>
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
                <div className="col-span-1">
                  <Checkbox 
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </div>
                <div className="col-span-3 font-medium">Name</div>
                <div className="col-span-1 font-medium">Type</div>
                <div className="col-span-2 font-medium">Tags</div>
                <div className="col-span-2 font-medium">Status</div>
                <div className="col-span-2 font-medium">Modified</div>
                <div className="col-span-1 font-medium">Actions</div>
              </div>
              
              <div className="divide-y">
                {/* Batch Documents */}
                {batchDocuments.map((batch) => (
                  <div className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50" key={batch.id}>
                    <div className="col-span-1">
                      <Checkbox 
                        checked={selectedItems.includes(batch.id)}
                        onCheckedChange={(checked:any) => handleSelectItem(batch.id, checked as boolean)}
                      />
                    </div>
                    <a href='/doc/batch/detail' className="col-span-3 flex items-center gap-2">
                      <Folder className={ICON_CLASS} />
                      <span>{batch.name}</span>
                      <span className="text-sm text-gray-500">({batch.count} documents)</span>
                    </a>
                    <div className="col-span-1">{batch.type}</div>
                    <div className="col-span-2 flex gap-1 flex-wrap">
                      {batch.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="col-span-2">
                      <Badge 
                        variant="outline" 
                        className={getStatusStyles(batch.status)}
                      >
                        {batch.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-gray-600">{batch.date}</div>
                    <div className="col-span-1 flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className={ICON_CLASS} />
                          </Button>
                        </DropdownMenuTrigger>
                        {renderDropdownActions()}
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
  
                {/* Individual Documents */}
                {individualDocuments.map((doc) => (
                  <div className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50" key={doc.id}>
                    <div className="col-span-1">
                      <Checkbox 
                        checked={selectedItems.includes(doc.id)}
                        onCheckedChange={(checked:any) => handleSelectItem(doc.id, checked as boolean)}
                      />
                    </div>
                    <a href='/doc/detail' className="col-span-3 flex items-center gap-2">
                      <FileText className={ICON_CLASS} />
                      <span>{doc.name}</span>
                    </a>
                    <div className="col-span-1">{doc.type}</div>
                    <div className="col-span-2 flex gap-1 flex-wrap">
                      {doc.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="col-span-2">
                      <Badge 
                        variant="outline" 
                        className={getStatusStyles(doc.status)}
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-gray-600">{doc.date}</div>
                    <div className="col-span-1 flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className={ICON_CLASS} />
                          </Button>
                        </DropdownMenuTrigger>
                        {renderDropdownActions()}
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
  
        {/* Action Bar for Selected Items */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-6 py-3 flex gap-4 items-center border">
            <span className="text-sm text-gray-600">{selectedItems.length} items selected</span>
            <Separator orientation="vertical" className="h-6" />
            {selectedItems.length === 1 ? <SingleItemActions /> : <BulkActions />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;