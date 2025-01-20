"use client"

import React, { useState } from 'react';
import { Eye, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ICON_CLASS = "h-4 w-4";

// Mock content for a realistic employment contract
const contractContent = {
  title: "EMPLOYMENT AGREEMENT",
  date: "20th day of January, 2024",
  parties: {
    company: {
      name: "Acme Corporation",
      address: "123 Business District, Suite 100, Singapore 123456",
      registration: "Registration No: 202012345K"
    },
    employee: {
      name: "Sarah Chen",
      nric: "S9876543A",
      address: "456 Residential Ave, #12-34, Singapore 654321"
    }
  },
  sections: [
    {
      title: "1. DEFINITIONS AND INTERPRETATION",
      content: `In this Agreement, unless the context otherwise requires, the following expressions shall have the following meanings:

"Company" means Acme Corporation and includes its successors in title and assigns;
"Confidential Information" means information relating to the business, products, affairs and finances of the Company;
"Employment" means the employment of the Employee under this Agreement;
"Group" means the Company and its holding company and the subsidiaries and associated companies of the Company;`
    },
    {
      title: "2. APPOINTMENT AND EMPLOYMENT TERM",
      content: `2.1. The Company hereby employs the Employee and the Employee hereby accepts employment with the Company as Software Engineer, commencing from February 1, 2024 (the "Commencement Date").

2.2. The Employee's employment shall continue until terminated in accordance with the provisions of this Agreement.

2.3. The first three (3) months of the Employment shall be a probationary period. During this period, either party may terminate the Employment by giving one (1) week's written notice.`
    },
    {
      title: "3. DUTIES AND RESPONSIBILITIES",
      content: `3.1. The Employee shall:
(a) devote their full time and attention to the business of the Company during working hours;
(b) faithfully and diligently perform such duties and exercise such powers as may be assigned to or vested in them;
(c) comply with all reasonable and lawful directions given by the Company;
(d) use their best endeavors to promote and protect the interests of the Company.

3.2. The Employee's normal place of work shall be at the Company's office at 123 Business District or such other place as the Company may reasonably require for the proper performance of their duties.`
    },
    {
      title: "4. COMPENSATION AND BENEFITS",
      content: `4.1. Salary
The Company shall pay the Employee a basic salary of $[AMOUNT] per annum, payable in 12 equal monthly installments by the last day of each calendar month.

4.2. Annual Leave
The Employee shall be entitled to 14 working days of paid annual leave per annum, in addition to public holidays. Leave shall be taken at such time as may be approved by the Company.

4.3. Medical Benefits
The Employee shall be entitled to medical benefits in accordance with the Company's medical benefits scheme, details of which are set out in the Company's Employee Handbook.

4.4. Annual Performance Bonus
The Employee may be eligible for an annual performance bonus, subject to the Company's discretion and the Employee's performance.`
    },
    {
      title: "5. WORKING HOURS AND OVERTIME",
      content: `5.1. The Employee's normal working hours shall be from Monday to Friday, 9:00 AM to 6:00 PM, with a one-hour lunch break.

5.2. The Employee understands and agrees that they may be required to work such additional hours as may be necessary for the proper performance of their duties.`
    },
    {
      title: "6. CONFIDENTIALITY",
      content: `6.1. The Employee shall not, either during the Employment or at any time thereafter, use or disclose to any person any Confidential Information about the business or affairs of the Company or any of its clients.

6.2. All records, documents, and other papers or electronic records made or acquired by the Employee in the course of the Employment shall be the property of the Company and must be returned upon termination of employment.`
    },
    {
      title: "7. INTELLECTUAL PROPERTY",
      content: `7.1. All intellectual property rights created by the Employee in the course of their employment shall belong to and be the absolute property of the Company.

7.2. The Employee hereby assigns to the Company all present and future intellectual property rights created during their employment.`
    },
    {
      title: "8. TERMINATION",
      content: `8.1. After the probation period, either party may terminate this Agreement by giving two (2) months' written notice or by paying salary in lieu of notice.

8.2. The Company may terminate the Employment immediately without notice or payment in lieu of notice if the Employee:
(a) commits any serious or persistent breach of this Agreement;
(b) is guilty of any grave misconduct or willful neglect in the discharge of their duties;
(c) becomes bankrupt or makes any arrangement with their creditors.`
    },
    {
      title: "9. GOVERNING LAW",
      content: `This Agreement shall be governed by and construed in accordance with the laws of Singapore.`
    }
  ],
  signature: {
    companySection: {
      title: "For and on behalf of ACME CORPORATION",
      name: "John Smith",
      position: "Director, Human Resources",
      date: "_____________________"
    },
    employeeSection: {
      title: "SIGNED by EMPLOYEE",
      name: "Sarah Chen",
      date: "_____________________"
    }
  }
};

interface DocumentPreviewProps {
  type?: 'contract' | 'letter' | 'report';
  loading?: boolean;
}

const DocumentPreview = ({ type = 'contract', loading = false }: DocumentPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = 4; // Realistic number of pages for this contract

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
  };

  const renderContractPreview = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mb-2 mx-auto text-blue-500" />
            <p className="text-sm text-gray-500">Loading document...</p>
          </div>
        </div>
      );
    }

    return (
      <div 
        className="bg-white shadow-sm mx-auto p-12 transition-all duration-200" 
        style={{ 
          width: `${8.5 * (zoom/100)}in`,
          minWidth: "8.5in",
          transform: `scale(${zoom/100})`,
          transformOrigin: 'top center'
        }}
      >
        {/* Contract Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold mb-4">{contractContent.title}</h1>
          <div className="text-sm mb-6">
            This Agreement is made on the {contractContent.date}
          </div>
          <div className="text-sm">
            between
          </div>
          <div className="my-4 font-semibold">
            {contractContent.parties.company.name}<br />
            <span className="font-normal text-sm">
              {contractContent.parties.company.address}<br />
              {contractContent.parties.company.registration}
            </span>
          </div>
          <div className="text-sm">
            and
          </div>
          <div className="mt-4 font-semibold">
            {contractContent.parties.employee.name}<br />
            <span className="font-normal text-sm">
              NRIC: {contractContent.parties.employee.nric}<br />
              {contractContent.parties.employee.address}
            </span>
          </div>
        </div>

        {/* Contract Content */}
        <div className="space-y-8">
          {contractContent.sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="font-bold">{section.title}</h2>
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Signature Section */}
        <div className="mt-16 space-y-12">
          {/* Company Signature */}
          <div>
            <p className="font-semibold mb-8">{contractContent.signature.companySection.title}</p>
            <div className="space-y-4">
              <div className="border-b border-black w-64" />
              <div>Name: {contractContent.signature.companySection.name}</div>
              <div>Position: {contractContent.signature.companySection.position}</div>
              <div>Date: {contractContent.signature.companySection.date}</div>
            </div>
          </div>

          {/* Employee Signature */}
          <div>
            <p className="font-semibold mb-8">{contractContent.signature.employeeSection.title}</p>
            <div className="space-y-4">
              <div className="border-b border-black w-64" />
              <div>Name: {contractContent.signature.employeeSection.name}</div>
              <div>Date: {contractContent.signature.employeeSection.date}</div>
            </div>
          </div>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-8 right-8 text-gray-400 text-sm">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full">
      {/* Preview Controls */}
      <CardHeader className="border-b bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className={ICON_CLASS} />
              Open
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className={ICON_CLASS} />
              Download
            </Button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
              >
                <ZoomOut className={ICON_CLASS} />
              </Button>
              <span className="text-sm w-16 text-center">{zoom}%</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
              >
                <ZoomIn className={ICON_CLASS} />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className={ICON_CLASS} />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className={ICON_CLASS} />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Preview Content */}
      <CardContent className="p-0 relative bg-gray-100 overflow-auto h-[calc(100vh-280px)]">
        <div className="min-h-full p-8 flex items-start justify-center">
          {renderContractPreview()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;