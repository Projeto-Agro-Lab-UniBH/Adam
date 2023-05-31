import { Report } from '@prisma/client';

export class ReportEntity implements Report {
  id: string;
  patientId: string;
  shift: string;
  author: string;
  report_text: string;
  createdAt: string;
  updatedAt: string;
  attachments: string;
}
