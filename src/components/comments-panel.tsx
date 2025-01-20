"use client"

import React, { useState } from 'react';
import { 
  Eye, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Loader2, MessageCircle, X, Check, Reply, MoreVertical 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface User {
    name: string;
    avatar: string | null;
    initials: string;
  }
  
  interface Reply {
    id: number;
    user: User;
    content: string;
    timestamp: string;
  }
  
  interface ResolvedBy {
    name: string;
    timestamp: string;
  }
  
  interface Comment {
    id: number;
    user: User;
    content: string;
    timestamp: string;
    section: string;
    status: 'open' | 'resolved';
    replies: Reply[];
    resolvedBy?: ResolvedBy;
  }
// Mock comments data
const mockComments = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      avatar: 'https://github.com/shadcn.png',
      initials: 'JD'
    },
    content: 'Should we update the compensation section to include the new benefits package?',
    timestamp: '2 hours ago',
    section: '4. COMPENSATION AND BENEFITS',
    status: 'open',
    replies: [
      {
        id: 11,
        user: {
          name: 'Jane Smith',
          avatar: null,
          initials: 'JS'
        },
        content: 'Yes, please add dental coverage details.',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 2,
    user: {
      name: 'Alice Wong',
      avatar: null,
      initials: 'AW'
    },
    content: 'The notice period in the termination clause needs to be updated to 3 months as per new policy.',
    timestamp: '3 hours ago',
    section: '8. TERMINATION',
    status: 'resolved',
    resolvedBy: {
      name: 'John Doe',
      timestamp: '1 hour ago'
    },
    replies: []
  }
];

// Comment Component
const Comment = ({ comment }: { comment: Comment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    console.log('Reply:', replyText);
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="p-4 border-b last:border-0">
      {/* Comment header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            {comment.user.avatar && <AvatarImage src={comment.user.avatar} />}
            <AvatarFallback>{comment.user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.user.name}</span>
              <span className="text-sm text-gray-500">{comment.timestamp}</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              on section: {comment.section}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {comment.status === 'open' ? (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Open
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Resolved
            </Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {comment.status === 'open' ? (
                <DropdownMenuItem>
                  <Check className="mr-2 h-4 w-4" /> Resolve
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <MessageCircle className="mr-2 h-4 w-4" /> Reopen
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-red-600">
                <X className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Comment content */}
      <div className="mt-2 text-sm">
        {comment.content}
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="mt-4 pl-8 space-y-4">
          {comment.replies.map((reply:any) => (
            <div key={reply.id} className="flex items-start gap-3">
              <Avatar className="h-6 w-6">
                {reply.user.avatar && <AvatarImage src={reply.user.avatar} />}
                <AvatarFallback>{reply.user.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{reply.user.name}</span>
                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                </div>
                <div className="text-sm mt-1">
                  {reply.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply action */}
      {comment.status === 'open' && (
        <div className="mt-4">
          {!isReplying ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500"
              onClick={() => setIsReplying(true)}
            >
              <Reply className="mr-2 h-4 w-4" />
              Reply
            </Button>
          ) : (
            <div className="space-y-2">
              <Input
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resolved info */}
      {comment.status === 'resolved' && comment.resolvedBy && (
        <div className="mt-2 text-xs text-gray-500">
          Resolved by {comment.resolvedBy.name} • {comment.resolvedBy.timestamp}
        </div>
      )}
    </div>
  );
};

// Comments Panel Component
export const CommentsPanel = () => {
  const [newComment, setNewComment] = useState('');

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Comments</h3>
          <Badge variant="secondary">{mockComments.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-auto">
        <div className="divide-y">
          {mockComments.map(comment => (
            <Comment key={comment.id} comment={comment as any} />
          ))}
        </div>
      </CardContent>
      <div className="border-t p-4">
        <div className="space-y-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button 
              size="sm"
              disabled={!newComment.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
