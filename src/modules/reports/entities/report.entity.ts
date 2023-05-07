import { Report } from '@prisma/client';

export class ReportEntity implements Report {
  id: string;
  patientId: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
