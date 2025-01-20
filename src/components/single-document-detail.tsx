"use client"

import React from 'react';
import { 
  ChevronLeft, Download, Share2, Edit, Tag, Shield, History, 
  Clock, Calendar, User, MessageSquare, FileText, Link2, Eye
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DocumentPreview from './single-document-preview';
import { CommentsPanel } from './comments-panel';

// Mock data for the document
const documentData = {
  id: 'doc-1',
  name: "Sarah Chen - Employment Contract",
  type: "Contract",
  status: "Pending",
  created: "Jan 15, 2024",
  modified: "Jan 16, 2024",
  creator: "John Doe",
  lastModifiedBy: "Jane Smith",
  size: "2.4 MB",
  version: "1.2",
  tags: ["Employment", "New Hire", "HR", "2024"],
  relatedDocs: [
    { id: 'rel-1', name: "Offer Letter - Sarah Chen", type: "Letter" },
    { id: 'rel-2', name: "Background Check - Sarah Chen", type: "Report" }
  ],
  activities: [
    { 
      id: 1,
      user: "Jane Smith",
      action: "modified the document",
      date: "2 hours ago",
      details: "Updated salary information"
    },
    { 
      id: 2,
      user: "John Doe",
      action: "created the document",
      date: "1 day ago",
      details: "Initial contract draft"
    }
  ]
};

const ICON_CLASS = "h-4 w-4";

const DocumentDetail = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="p-4 max-w-[1600px] mx-auto">
          {/* Back & Actions */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className={ICON_CLASS} />
              Back to Documents
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className={ICON_CLASS} />
                Download
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className={ICON_CLASS} />
                Share
              </Button>
              <Button variant="outline" className="gap-2">
                <Edit className={ICON_CLASS} />
                Edit
              </Button>
            </div>
          </div>
          
          {/* Document Title & Info */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{documentData.name}</h1>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                <span>{documentData.type}</span>
                <span>•</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  {documentData.status}
                </Badge>
                <span>•</span>
                <span>Version {documentData.version}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="max-w-[1600px] mx-auto p-4">
        <div className="flex gap-6">
          {/* Left: Document Preview */}
          <div className="flex-1">
          <DocumentPreview/>
          </div>

          {/* Right: Document Details */}
          <div className="w-[400px]">
            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="space-y-6 pr-4">
                {/* Document Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Document Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className={ICON_CLASS} />
                        <span className="text-gray-500">Created:</span>
                        <span>{documentData.created}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className={ICON_CLASS} />
                        <span className="text-gray-500">Modified:</span>
                        <span>{documentData.modified}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className={ICON_CLASS} />
                        <span className="text-gray-500">Created by:</span>
                        <span>{documentData.creator}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className={ICON_CLASS} />
                        <span className="text-gray-500">Modified by:</span>
                        <span>{documentData.lastModifiedBy}</span>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium mb-2">Tags</div>
                      <div className="flex flex-wrap gap-1">
                        {documentData.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle>Related Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {documentData.relatedDocs.map(doc => (
                        <div 
                          key={doc.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                        >
                          <FileText className={ICON_CLASS} />
                          <div>
                            <div className="text-sm">{doc.name}</div>
                            <div className="text-xs text-gray-500">{doc.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documentData.activities.map(activity => (
                        <div key={activity.id} className="flex gap-2">
                          <div className="mt-0.5">
                            <User className={ICON_CLASS} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm">
                              <span className="font-medium">{activity.user}</span>
                              {" "}
                              {activity.action}
                            </div>
                            {activity.details && (
                              <div className="text-sm text-gray-500 mt-0.5">
                                {activity.details}
                              </div>
                            )}
                            <div className="text-xs text-gray-400 mt-1">
                              {activity.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <div className="w-[400px] shrink-0 border-l">
                <CommentsPanel />
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;