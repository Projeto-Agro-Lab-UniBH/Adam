import { Exam } from '@prisma/client';

export class ExamEntity implements Exam {
  id: string;
  patientId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
