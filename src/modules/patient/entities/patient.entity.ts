import { Patient, Prisma } from '@prisma/client';

export class PatientEntity implements Patient {
  id: string;
  profile_photo: string;
  name: string;
  owner: string;
  specie: string;
  race: string;
  gender: string;
  weight: string;
  prognosis: string;
  diagnosis: Prisma.JsonValue[];
  physical_shape: string;
  entry_date: string;
  departure_date: string;
}
