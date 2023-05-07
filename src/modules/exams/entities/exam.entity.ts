import { Exam, Prisma } from '@prisma/client';

export class ExamEntity implements Exam {
  id: string;
  patientId: string;
  name: string;
  data: Prisma.JsonValue;
  createdAt: string;
  updatedAt: string;
}
