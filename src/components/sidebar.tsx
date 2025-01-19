"use client"

import React, { useState } from 'react';
import { Building, Users, Briefcase, Star, ChevronDown, Library, Settings, LogOut, Receipt, Scale, FolderOpen, Folder, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Constant for consistent icon sizing
const ICON_CLASS = "h-4 w-4 shrink-0";

const Sidebar = () => {
  const [activeWorkspace, setActiveWorkspace] = useState('hr');
  const [activeDocument, setActiveDocument] = useState('contracts');
  const [activeSection, setActiveSection] = useState('documents');

  const workspaces = [
    {
      id: 'hr',
      name: 'HR Department',
      icon: <Briefcase className={ICON_CLASS} />,
      documents: [
        { id: 'contracts', name: 'Employee Contracts' },
        { id: 'reviews', name: 'Performance Reviews' },
        { id: 'onboarding', name: 'Onboarding Docs' },
        { id: 'leave', name: 'Leave Management' }
      ],
      templates: [
        { id: 'contract-templates', name: 'Contract Templates' },
        { id: 'letter-templates', name: 'Letter Templates' },
        { id: 'form-templates', name: 'Form Templates' }
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: <Receipt className={ICON_CLASS} />,
      documents: [
        { id: 'invoices', name: 'Invoices' },
        { id: 'expenses', name: 'Expenses' },
        { id: 'reports', name: 'Reports' }
      ],
      templates: [
        { id: 'invoice-templates', name: 'Invoice Templates' },
        { id: 'report-templates', name: 'Report Templates' }
      ]
    },
    {
      id: 'legal',
      name: 'Legal',
      icon: <Scale className={ICON_CLASS} />,
      documents: [
        { id: 'contracts', name: 'Contracts' },
        { id: 'compliance', name: 'Compliance' }
      ],
      templates: [
        { id: 'agreement-templates', name: 'Agreement Templates' },
        { id: 'policy-templates', name: 'Policy Templates' }
      ]
    }
  ];

  return (
    <div className="w-64 border-r flex flex-col h-screen bg-white">
      {/* Organization Header */}
      <div className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-2">
              <div className="flex items-center gap-2">
                <Building className={ICON_CLASS + " text-blue-600"} />
                <span className="font-semibold">Acme Corporation</span>
              </div>
              <ChevronDown className={ICON_CLASS} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <Building className={ICON_CLASS + " mr-2"} />
              Switch Organization
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className={ICON_CLASS + " mr-2"} />
              Organization Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto">
        {/* Quick Access */}
        <div className="p-4">
          <div className="text-sm font-medium text-gray-500 mb-2">QUICK ACCESS</div>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Star className={ICON_CLASS + " mr-2"} />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FolderOpen className={ICON_CLASS + " mr-2"} />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Library className={ICON_CLASS + " mr-2"} />
              Global Templates
            </Button>
          </div>
        </div>

        <Separator />

        {/* Workspaces */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">WORKSPACES</span>
            <Button variant="ghost" size="icon" className="h-4 w-4">
              <Plus className={ICON_CLASS} />
            </Button>
          </div>
          
          <Accordion type="single" collapsible defaultValue="hr">
            {workspaces.map((workspace) => (
              <AccordionItem value={workspace.id} key={workspace.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    {workspace.icon}
                    <span>{workspace.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-4">
                    {/* Documents Section */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">DOCUMENTS</div>
                      <div className="space-y-1">
                        {workspace.documents.map((doc) => (
                          <Button
                            key={doc.id}
                            variant={activeWorkspace === workspace.id && activeDocument === doc.id && activeSection === 'documents' ? "secondary" : "ghost"}
                            className={`w-full justify-start ${
                              activeWorkspace === workspace.id && activeDocument === doc.id && activeSection === 'documents'
                                ? "bg-blue-100 hover:bg-blue-100" 
                                : ""
                            }`}
                            onClick={() => {
                              setActiveWorkspace(workspace.id);
                              setActiveDocument(doc.id);
                              setActiveSection('documents');
                            }}
                          >
                            <Folder className={ICON_CLASS + " mr-2"} />
                            {doc.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Templates Section */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">TEMPLATES</div>
                      <div className="space-y-1">
                        {workspace.templates.map((template) => (
                          <Button
                            key={template.id}
                            variant={activeWorkspace === workspace.id && activeDocument === template.id && activeSection === 'templates' ? "secondary" : "ghost"}
                            className={`w-full justify-start ${
                              activeWorkspace === workspace.id && activeDocument === template.id && activeSection === 'templates'
                                ? "bg-blue-100 hover:bg-blue-100" 
                                : ""
                            }`}
                            onClick={() => {
                              setActiveWorkspace(workspace.id);
                              setActiveDocument(template.id);
                              setActiveSection('templates');
                            }}
                          >
                            <Library className={ICON_CLASS + " mr-2"} />
                            {template.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* User Account - Fixed at bottom */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-gray-500">john@acme.com</span>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className={ICON_CLASS + " mr-2"} />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className={ICON_CLASS + " mr-2"} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;